const express = require("express");
const db = require("../config/database.js");

const router = express.Router();

// get user folders info
async function getFolderInfo(user) {
  try {
    const result = await db.query(
      `
      SELECT 
        f.id_folder, 
        id_purchase, 
        f.name 
      FROM folders f
      JOIN purchases p ON p.id_folder=f.id_folder
      WHERE f.id_owner = $1
      `,
      [user]
    );
    const folderInfo = result.rows;
    return folderInfo;
  } catch (err) {
    console.error("Info error:", err);
    throw err;
  }
}

// get all purchases in a folder
async function getFolderPurchaseInfo(folder) {
  try {
    const result = await db.query(
      `
      SELECT 
        p.id_purchase, 
        id_folder, 
        name, 
        deadline, 
        (count+1) as members
      FROM purchases p
      JOIN (	
          SELECT id_purchase, COUNT(id_user) 
          FROM members_in_purchases
          GROUP BY id_purchase
      ) as m 
      ON m.id_purchase = p.id_purchase
      WHERE id_folder = $1
    `,
      [folder]
    );
    const purchases = result.rows;
    return purchases;
  } catch (err) {
    console.error("Members error:", err);
    throw err;
  }
}

// get all user purchases wothout a folder
async function getNoFolderPurchaseInfo(user) {
  try {
    const result = await db.query(
      `
      SELECT 
        p.id_purchase, 
        id_user, 
        name, 
        deadline, 
        (count+1) as members 
      FROM members_in_purchases mip 
      JOIN purchases p 
      ON mip.id_purchase = p.id_purchase
      JOIN (	
          SELECT id_purchase, COUNT(id_user) 
          FROM members_in_purchases
          GROUP BY id_purchase
      ) as m 
      ON m.id_purchase = p.id_purchase
      WHERE id_user = $1
      `,
      [user]
    );
    const purchases = result.rows;
    return purchases;
  } catch (err) {
    console.error("Members error:", err);
    throw err;
  }
}

// fill folders with purchases
async function getFilledFolders(user) {
  const foldersInfo = await getFolderInfo(user);
  if (!foldersInfo) {
    return [];
  }
  const filledFolders = await Promise.all(
    foldersInfo.map(async (folder) => {
      const list_purchase = await getFolderPurchaseInfo(folder.id_folder);
      return {
        ...folder,
        list: list_purchase,
      };
    })
  );
  return filledFolders;
}

router.get("/:user_id/folders", async (req, res) => {
  try {
    console.log("SESSION USERID: ", req.session.userId);

    const { user_id } = req.params;
    console.log(user_id);

    const isAuthorised = req.session.userId === Number(user_id);
    console.log("USER: ", isAuthorised);
    console.log(isAuthorised);
    if (isAuthorised) {
      const withoutFolder = await getNoFolderPurchaseInfo(user_id);
      const foldersInfo = await getFilledFolders(user_id);

      console.log(withoutFolder, foldersInfo);

      res.json({
        withoutFolder: withoutFolder,
        foldersInfo: foldersInfo,
      });
    } else {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
