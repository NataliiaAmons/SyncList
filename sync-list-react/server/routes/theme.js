const express = require("express");

const router = express.Router();

router.post("/toggle-theme", async (req, res) => {
  const theme = req.body.theme === "night" ? "night" : "day";

  res.setHeader("Set-Cookie", `theme=${theme}`);

  const redirectUrl = req.body.redirect || "/";
  res.redirect(redirectUrl);
});

module.exports = router;
