// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "#020617",
        color: "#94a3b8",
        padding: "14px",
        textAlign: "center",
        fontSize: 13,
        marginTop: 40,
      }}
    >
      © {new Date().getFullYear()} SeatDSA · Built with React + TypeScript
    </footer>
  );
};

export default Footer;
