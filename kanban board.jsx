import React, { useState } from "react";

function KanbanBoard() {
  /* ---------------- Initial Columns ---------------- */

  const [columns, setColumns] = useState({
    todo: ["Learn React", "Build UI"],
    progress: ["Practice DSA"],
    done: ["Sleep Eventually"],
  });

  /* ---------------- Drag State ---------------- */

  const [draggedItem, setDraggedItem] = useState(null);

  /* ---------------- Drag Start ---------------- */

  const handleDragStart = (item, sourceColumn) => {
    setDraggedItem({
      item,
      sourceColumn,
    });
  };

  /* ---------------- Allow Drop ---------------- */

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* ---------------- Drop Logic ---------------- */

  const handleDrop = (targetColumn) => {
    // Ignore invalid drop
    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    // Prevent duplicate drop in same column
    if (sourceColumn === targetColumn) return;

    setColumns((prev) => {
      return {
        ...prev,

        // Remove item from source column
        [sourceColumn]: prev[sourceColumn].filter((task) => task !== item),

        // Add item to target column
        [targetColumn]: [...prev[targetColumn], item],
      };
    });

    setDraggedItem(null);
  };

  return (
    <div style={boardStyle}>
      {Object.keys(columns).map((columnKey) => (
        <div
          key={columnKey}
          style={columnStyle}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(columnKey)}
        >
          <h2>{columnKey.toUpperCase()}</h2>

          {columns[columnKey].map((task) => (
            <div
              key={task}
              draggable
              onDragStart={() => handleDragStart(task, columnKey)}
              style={cardStyle}
            >
              {task}
            </div>
          ))}
          
        </div>
      ))}
    </div>
  );
}

/* ---------------- Styles ---------------- */

const boardStyle = {
  display: "flex",
  gap: "20px",
  padding: "40px",
};

const columnStyle = {
  width: "250px",
  minHeight: "300px",
  background: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
};

const cardStyle = {
  background: "white",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  cursor: "grab",
};

export default KanbanBoard;
