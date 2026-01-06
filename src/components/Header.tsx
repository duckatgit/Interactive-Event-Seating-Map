// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "linear-gradient(90deg, #0f172a, #020617)",
        color: "#fff",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}>
        🎟️ Metropolis Arena
      </div>

   
    </header>
  );
};

export default Header;
