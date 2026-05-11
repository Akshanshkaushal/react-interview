import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component Mounted / Count Updated");

    // Cleanup function
    return () => {
      console.log("Cleanup Before Next Effect / Unmount");
    };
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Count: {count}</h1>

      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
