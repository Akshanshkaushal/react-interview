import React, { useRef, useState, useEffect } from "react";

function UseRefExamples() {
  /* ------------------------------------------------ */
  /* 1. DOM Access / Focus Management                 */
  /* ------------------------------------------------ */

  const inputRef = useRef(null);

  const focusInput = () => {
    // Access actual input DOM node
    inputRef.current.focus();
  };

  /* ------------------------------------------------ */
  /* 2. Previous Value Storage                        */
  /* ------------------------------------------------ */

  const [count, setCount] = useState(0);

  const prevCountRef = useRef();

  useEffect(() => {
    // Store previous count
    prevCountRef.current = count;
  }, [count]);

  /* ------------------------------------------------ */
  /* 3. Timer / Interval Storage                      */
  /* ------------------------------------------------ */

  const intervalRef = useRef(null);

  const startTimer = () => {
    // Store interval ID
    intervalRef.current = setInterval(() => {
      console.log("Timer Running");
    }, 1000);
  };

  const stopTimer = () => {
    // Clear interval using stored ID
    clearInterval(intervalRef.current);
  };

  /* ------------------------------------------------ */
  /* 4. Outside Click Detection                       */
  /* ------------------------------------------------ */

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if clicked outside dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        console.log("Outside Clicked");
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ------------------------------------------------ */
  /* 5. Scroll To Element                             */
  /* ------------------------------------------------ */

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    // Scroll smoothly to section
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ------------------------------------------------ */
  /* 6. Video / Audio Control                         */
  /* ------------------------------------------------ */

  const videoRef = useRef(null);

  const playVideo = () => {
    // Play video using DOM method
    videoRef.current.play();
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* 1. Focus Input */}
      <h2>1. Focus Input</h2>

      <input ref={inputRef} placeholder="Enter text" />

      <button onClick={focusInput}>
        Focus Input
      </button>

      <hr />

      {/* 2. Previous Value */}
      <h2>2. Previous Value</h2>

      <p>Current Count: {count}</p>

      <p>
        Previous Count: {prevCountRef.current}
      </p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <hr />

      {/* 3. Timer */}
      <h2>3. Timer</h2>

      <button onClick={startTimer}>
        Start Timer
      </button>

      <button onClick={stopTimer}>
        Stop Timer
      </button>

      <hr />

      {/* 4. Outside Click Detection */}
      <h2>4. Outside Click Detection</h2>

      <div
        ref={dropdownRef}
        style={{
          width: "200px",
          padding: "20px",
          border: "1px solid black",
        }}
      >
        Dropdown Area
      </div>

      <hr />

      {/* 5. Scroll To Element */}
      <h2>5. Scroll To Section</h2>

      <button onClick={scrollToSection}>
        Scroll Down
      </button>

      <div style={{ height: "500px" }}></div>

      <div
        ref={sectionRef}
        style={{
          padding: "20px",
          background: "lightgray",
        }}
      >
        Target Section
      </div>

      <hr />

      {/* 6. Video Control */}
      <h2>6. Video Control</h2>

      <video
        ref={videoRef}
        width="300"
        controls
      >
        <source
          src="sample-video.mp4"
          type="video/mp4"
        />
      </video>

      <br />

      <button onClick={playVideo}>
        Play Video
      </button>
    </div>
  );
}

export default UseRefExamples;