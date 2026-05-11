import React, { useState, useEffect } from "react";

/* ---------------- Modal Component ---------------- */

function Modal({ isOpen, onClose, children }) {
  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Conditional rendering
  if (!isOpen) return null;

  // Prevent overlay close when clicking inside modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      {"propagation stops moving upwards using e.stopPropagation()"}
      <div style={modalStyle} onClick={handleContentClick}>
        <button style={closeBtnStyle} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/* ---------------- App Component ---------------- */

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Modal / Popup Example</h1>

      <button onClick={openModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>React Modal</h2>
        <p>This is a reusable popup component.</p>
      </Modal>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

export default App;
