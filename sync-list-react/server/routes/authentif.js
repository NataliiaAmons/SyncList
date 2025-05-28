const express = require("express");
const db = require("../config/database.js");
const bcrypt = require("bcrypt");

const router = express.Router();

const multer = require("multer");
const upload = multer();

// signup request
router.post("/signup", upload.none(), async (req, res) => {
  try {
    if (req.body && typeof req.body === "object") {
      for (let k in req.body) {
        if (typeof req.body[k] === "string") {
          req.body[k] = req.body[k].trim();
        }
      }
    }
    const { first_name, last_name, username, email, password } = req.body;
    console.log(req.body);

    // checking if username or email are taken
    const exists = await db.query(
      `
      SELECT * FROM users
      WHERE email = $1 OR username = $2`,
      [email, username]
    );
    if (exists.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const result = await db.query(
      `
      INSERT INTO users (first_name, last_name, username, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_user`,
      [first_name, last_name, username, email, hashedPassword]
    );
    const userId = result.rows[0].id_user;

    req.session.userId = userId;
    return res
      .status(201)
      .json({ success: true, message: "User created", userId: userId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// login request
router.post("/login", upload.none(), async (req, res) => {
  try {
    if (req.body && typeof req.body === "object") {
      for (let k in req.body) {
        if (typeof req.body[k] === "string") {
          req.body[k] = req.body[k].trim();
        }
      }
    }

    const { email, password } = req.body;
    console.log(req.body);

    const result = await db.query(
      `
      SELECT id_user, username, email, password FROM users
        WHERE email = $1 
	      OR username = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong email or password" });
    }

    const row = result.rows[0];
    console.log("QUERY: ", result.rows);
    console.log("password: ", password);
    console.log("row.password: ", row.password);

    if (await bcrypt.compare(password, row.password)) {
      req.session.userId = row.id_user;
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        userId: row.id_user,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Wrong email or password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:user_id/user-info", async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(req.session.userId);

    const result = await db.query(
      `
      SELECT * FROM users
        WHERE id_user = $1`,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
