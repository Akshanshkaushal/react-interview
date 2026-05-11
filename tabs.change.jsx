import React, { useState } from "react";

/* ---------------- Tabs Data ---------------- */

const tabsData = [
  {
    id: 1,
    title: "Home",
    content: "Welcome to the Home tab.",
  },
  {
    id: 2,
    title: "Profile",
    content: "This is the Profile tab.",
  },
  {
    id: 3,
    title: "Settings",
    content: "Manage your settings here.",
  },
];

/* ---------------- Tabs Component ---------------- */

function Tabs() {
  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Tabs Component</h1>

      {/* Tab Buttons */}
      <div style={tabContainer}>
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            style={{
              ...tabButton,
              backgroundColor:
                activeTab === index ? "#333" : "#ddd",
              color:
                activeTab === index ? "white" : "black",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div style={contentStyle}>
        <h2>{tabsData[activeTab].title}</h2>

        <p>{tabsData[activeTab].content}</p>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const tabContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tabButton = {
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
};

const contentStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "8px",
};

export default Tabs;