import React, { createContext, useContext, useState } from "react";

// STEP 1 → Create Context
const ThemeContext = createContext();


// STEP 2 → Provider
function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


// STEP 3 → Consume Context
function Navbar() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        padding: "20px"
      }}
    >
      <h2>{theme} mode</h2>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}


// STEP 4 → Wrap App
export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}