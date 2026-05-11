import React, { useState } from "react";

function ProgressBar() {
  /* ---------------- Progress State ---------------- */

  const [progress, setProgress] = useState(30);

  /* ---------------- Handlers ---------------- */

  const increaseProgress = () => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
  };

  const decreaseProgress = () => {
    setProgress((prev) => (prev <= 0 ? 0 : prev - 10));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Progress Bar</h1>

      {/* Outer Container */}
      <div style={containerStyle}>
        {/* Inner Progress Fill */}
        <div
          style={{
            ...progressStyle,

            // Dynamic width
            width: `${progress}%`,
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={decreaseProgress}>- Decrease</button>

        <button onClick={increaseProgress} style={{ marginLeft: "10px" }}>
          + Increase
        </button>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const containerStyle = {
  width: "400px",
  height: "30px",
  backgroundColor: "#ddd",
  borderRadius: "20px",
  overflow: "hidden",
};

const progressStyle = {
  height: "100%",
  backgroundColor: "green",
  textAlign: "center",
  color: "white",

  // Animation
  transition: "width 0.3s ease",
};

export default ProgressBar;
