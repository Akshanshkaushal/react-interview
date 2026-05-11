import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  /* ---------------- State ---------------- */

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /* ---------------- Interval Ref ---------------- */

  // Stores interval ID without re-rendering
  const intervalRef = useRef(null);

  /* ---------------- Timer Logic ---------------- */

  useEffect(() => {
    // Start timer only when running
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Functional update avoids stale state
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      clearInterval(intervalRef.current);
    };
    
  }, [isRunning]);

  /* ---------------- Handlers ---------------- */

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);

    // Stop interval immediately
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);

    clearInterval(intervalRef.current);

    setSeconds(0);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Stopwatch / Timer</h1>

      <h2>{seconds}s</h2>

      <button onClick={startTimer}>
        Start
      </button>

      <button onClick={stopTimer}>
        Stop
      </button>

      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default Stopwatch;