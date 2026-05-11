import React, { useState, useEffect, useRef } from "react";

/* ---------------- Dropdown Component ---------------- */

function Dropdown() {
  // Dropdown open state
  const [isOpen, setIsOpen] = useState(false);

  // Ref for dropdown container
  const dropdownRef = useRef(null);

  /* ---------------- Toggle Dropdown ---------------- */

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /* ---------------- Outside Click Close ---------------- */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If clicked outside dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dropdown Component</h1>

      {/* Dropdown Wrapper */}
      <div ref={dropdownRef} style={dropdownContainer}>
        {/* Toggle Button */}
        <button
          onClick={toggleDropdown}
          style={buttonStyle}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Select Option ▼
        </button>

        {/* Conditional Rendering */}
        {isOpen && (
          <div style={menuStyle}>
            <p style={itemStyle}>Profile</p>
            <p style={itemStyle}>Settings</p>
            <p style={itemStyle}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const dropdownContainer = {
  position: "relative",
  width: "200px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  cursor: "pointer",
};

const menuStyle = {
  position: "absolute",
  top: "45px",
  width: "100%",
  border: "1px solid #ccc",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const itemStyle = {
  padding: "10px",
  cursor: "pointer",
  margin: 0,
};

export default Dropdown;
