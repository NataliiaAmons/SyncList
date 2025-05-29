const express = require("express");
const db = require("../config/database.js");

const router = express.Router();

// get purchase name and deadline
async function getPurchaseInfo(id) {
  try {
    const result = await db.query(
      `
      SELECT * FROM purchases
      WHERE id_purchase = $1`,
      [id]
    );
    const purchaseInfo = result.rows[0];
    return purchaseInfo;
  } catch (err) {
    console.error("Info error:", err);
    throw err;
  }
}

// get purchase members
async function getPurchaseMembers(id) {
  try {
    const result = await db.query(
      `
      SELECT username, profile_picture, first_name, last_name  
      FROM purchases p
      JOIN users u ON u.id_user = p.id_owner OR u.id_user IN (
        SELECT mip.id_user
        FROM members_in_purchases mip
        WHERE mip.id_purchase = p.id_purchase
      )
      WHERE p.id_purchase = $1`,
      [id]
    );
    const members = result.rows;
    return members;
  } catch (err) {
    console.error("Members error:", err);
    throw err;
  }
}

// get purchase items
async function getPurchaseUserItems(purchase, user) {
  try {
    const result = await db.query(
      `
      SELECT * FROM items i
      LEFT JOIN users u 
      ON u.id_user = i.id_claimed_by
      WHERE id_purchase = $1 AND id_claimed_by = $2
      ORDER BY (completed IS NOT false)`,
      [purchase, user]
    );
    const items = result.rows;
    return items;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

async function getPurchaseOtherItems(purchase, user) {
  try {
    const result = await db.query(
      `
      SELECT * FROM items i
      LEFT JOIN users u 
      ON u.id_user = i.id_claimed_by
      WHERE id_purchase = $1 AND (id_claimed_by IS DISTINCT FROM $2)
      ORDER BY (id_claimed_by IS NOT NULL)`,
      [purchase, user]
    );
    const items = result.rows;
    return items;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

async function checkIfAllowedPurchase(purchase, user) {
  try {
    const result = await db.query(
      `
      SELECT *
      FROM purchases p
      JOIN members_in_purchases mip 
        ON p.id_purchase = mip.id_purchase
      WHERE p.id_purchase = $1  
      AND (p.id_owner = $2 OR mip.id_user = $2)`,
      [purchase, user]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

router.get("/purchase/:purchase_id", async (req, res) => {
  try {
    const user_id = req.session.userId;
    console.log("SESSION USERID: ", req.session.userId);

    const { purchase_id } = req.params;

    const isAllowedPurchase = await checkIfAllowedPurchase(
      purchase_id,
      user_id
    );
    console.log("PURCHASE: ", isAllowedPurchase);
    if (isAllowedPurchase) {
      console.log("User:", user_id);
      console.log("Purchase:", purchase_id);

      const purchaseInfo = await getPurchaseInfo(purchase_id);
      const purchaseMembers = await getPurchaseMembers(purchase_id);
      const userItems = await getPurchaseUserItems(purchase_id, user_id);
      const otherItems = await getPurchaseOtherItems(purchase_id, user_id);

      //console.log(purchaseInfo, purchaseMembers, userItems, otherItems);

      res.json({
        info: purchaseInfo,
        members: purchaseMembers,
        userItems: userItems,
        otherItems: otherItems,
      });
    } else {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
