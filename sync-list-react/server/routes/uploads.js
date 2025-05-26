const { v4: uuidv4 } = require("uuid");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/database.js");

const router = express.Router();

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

router.post("/upload-item", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, notes, purchase_id } = req.body;
    const image = req.file?.filename;

    // delete image if missing required columns
    if (!name || !purchase_id) {
      if (image) {
        fs.unlink(path.join(__dirname, "../uploads", image), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
    INSERT INTO items (id_purchase, name, notes, image)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [purchase_id, name, notes, image];

    const { rows } = await db.query(query, values);

    res.json({ success: true, item: rows[0] });
  } catch (err) {
    console.error("Database error:", err);

    // delete image if query didn`t succeed
    if (image) {
      fs.unlink(path.join(__dirname, "../uploads", image), (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
