import React, { useState } from "react";

/* ---------------- Accordion Data ---------------- */

const accordionData = [
  {
    id: 1,
    title: "What is React?",
    content: "React is a JavaScript library for building UI.",
  },

  {
    id: 2,
    title: "What is useState?",
    content: "useState is a React Hook for managing state.",
  },

  {
    id: 3,
    title: "What is useEffect?",
    content: "useEffect handles side effects in React.",
  },
];

/* ---------------- Accordion Component ---------------- */

function Accordion() {
  /* ---------------- Active Section ---------------- */

  // Stores currently open accordion ID
  const [activeId, setActiveId] = useState(null);

  /* ---------------- Toggle Logic ---------------- */

  const handleToggle = (id) => {
    // Close if already open
    if (activeId === id) {
      setActiveId(null);
    }

    // Open clicked accordion
    else {
      setActiveId(id);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Accordion Component</h1>

      {accordionData.map((item) => (
        <div key={item.id} style={accordionStyle}>
          {/* Accordion Header */}
          <div style={headerStyle} onClick={() => handleToggle(item.id)}>
            <h3>{item.title}</h3>

            <span>{activeId === item.id ? "−" : "+"}</span>
          </div>

          {/* Conditional Rendering */}
          {activeId === item.id && (
            <div style={contentStyle}>
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Styles ---------------- */

const accordionStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginBottom: "10px",
  overflow: "hidden",
};

const headerStyle = {
  padding: "15px",
  background: "#f4f4f4",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const contentStyle = {
  padding: "15px",
  background: "white",
};

export default Accordion;
