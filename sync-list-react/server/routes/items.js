const { v4: uuidv4 } = require("uuid");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/database.js");

const router = express.Router();

router.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueFilename = uuidv4() + ext;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

router.patch("/edit-item", upload.single("newImage"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let newImage = req.file?.filename;
    const { item_id, name, notes, prevImage, deleteImage } = req.body;
    const cleanNotes = notes === "null" ? null : notes;

    let finalImage;

    if (deleteImage === "true" && !newImage) {
      // Delete, no new upload -> delete
      finalImage = null;
      if (prevImage && prevImage !== "null") {
        fs.unlink(path.join(__dirname, "../uploads", prevImage), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
    } else if (
      deleteImage === "false" &&
      !newImage &&
      prevImage &&
      prevImage !== "null"
    ) {
      // No delete, no new upload -> keep previous image
      finalImage = prevImage;
    } else {
      // -> new image
      finalImage = newImage;
    }

    var query = `
        UPDATE items
        SET name = $1,
            notes = $2,
            image = $3
        WHERE id_item = $4;
      `;
    var values = [name, cleanNotes, finalImage, item_id];

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    const { rows } = await db.query(query, values);

    res.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/claim-item", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { user_id, item_id } = req.body;

    const query = `
      UPDATE items
      SET id_claimed_by = $1
      WHERE id_item = $2
    `;
    const values = [user_id, item_id];

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    const { rows } = await db.query(query, values);

    res.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/drop-item", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { item_id } = req.body;

    const query = `
      UPDATE items
      SET id_claimed_by = NULL
      WHERE id_item = $1
    `;
    const values = [item_id];

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    const { rows } = await db.query(query, values);

    res.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/complete-item", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { item_id } = req.body;

    const query = `
      UPDATE items
      SET completed = true
      WHERE id_item = $1
    `;
    const values = [item_id];

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    const { rows } = await db.query(query, values);

    res.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-item", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { item_id } = req.body;

    const query = `
      DELETE FROM items 
      WHERE id_item = $1;
    `;
    const values = [item_id];

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    await db.query(query, values);

    res.json({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
