import React, { useEffect, useState } from "react";

export default function ThemeManager() {
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    // change cookie first
    const form = document.createElement("form");
    form.method = "GET";
    form.action = "http://localhost:5000/set-theme";
    form.style.display = "none";
    document.body.appendChild(form);
    form.submit();

    // setcorrecTheme
    setTimeout(() => {
      const match = document.cookie.match(/(^|;) ?theme=([^;]*)(;|$)/);
      const themeFromCookie = match ? match[2] : "day";
      setTheme(themeFromCookie);
    }, 50);
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.toggle("night", theme === "night");
  }, [theme]);

  return null;
}
