import React, { useEffect, useState } from "react";

export default function ThemeSwitch({ initialTheme }) {
  const [theme, setTheme] = useState(initialTheme || "day");

  useEffect(() => {
    document.body.className = theme;
    const match = document.cookie.match(/(^|;) ?theme=([^;]*)(;|$)/);
    setTheme(match ? match[2] : "day");
    document.body.classList.toggle("night", theme === "night");
  });

  return (
    <div class="theme-switch-container">
      <i class="fa-regular fa-sun"></i>
      <form
        id="theme-switch"
        method="POST"
        action="http://localhost:5000/toggle-theme"
      >
        <input type="hidden" name="redirect" value={window.location.href} />
        <label class="switch">
          <input
            type="checkbox"
            name="theme"
            value="night"
            checked={theme === "night"}
            onChange={(e) => {
              document.getElementById("theme-switch").submit();
            }}
          />
          <span class="slider round"></span>
        </label>
      </form>
      <i class="fa-regular fa-moon"></i>
    </div>
  );
}
