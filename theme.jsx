import React, { useState, useEffect } from "react";

function DarkModeToggle() {
  // Get theme from localStorage initially
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark";
  });

  // Persist theme + apply styles
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "white";

      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Toggle function
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        {darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </h1>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default DarkModeToggle;