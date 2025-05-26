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

module.exports = router;
