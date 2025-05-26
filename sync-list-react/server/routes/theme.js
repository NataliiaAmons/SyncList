const express = require("express");

const router = express.Router();

function setThemeByTime(req, res, next) {
  console.log("Cookies received:", req.cookies);

  if (req.cookies.themeUserSet) {
    return next();
  }

  const hour = new Date().getHours();
  const timeTheme = hour >= 21 || hour < 6 ? "night" : "day";
  console.log(`Hour: ${hour}, setting theme: ${timeTheme}`);

  if (req.cookies.theme !== timeTheme) {
    res.cookie("theme", timeTheme, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: "lax",
    });
  }
  next();
}

router.get("/set-theme", setThemeByTime, (req, res) => {
  res.sendStatus(204);
});

router.post("/toggle-theme", async (req, res) => {
  const theme = req.body.theme === "night" ? "night" : "day";

  res.cookie("theme", theme, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: "lax",
  });

  res.cookie("themeUserSet", "true", {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: "lax",
  });

  const redirectUrl = req.body.redirect || "/";
  res.redirect(redirectUrl);
});

router.use(setThemeByTime);

module.exports = router;
