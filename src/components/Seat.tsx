import React from "react";

interface SeatProps {
  id: string;
  x: number;
  y: number;
  status: "available" | "reserved" | "sold" | "held";
  price: number;
  seatNumber: number;
  selected: boolean;
  onClick: () => void;
  onNavigate?: (direction: string) => void;
  scale?: number; // 🔥 responsive scaling
}

const Seat: React.FC<SeatProps> = ({
  id,
  x,
  y,
  status,
  seatNumber,
  selected,
  onClick,
  onNavigate,
  scale = 1, // default desktop
}) => {
  const size = 40 * scale;
  const half = size / 2;

  // Explicit if-else for easier debugging
  let strokeColor: string;
  let fillColor: string;
  if (status === "sold") {
    strokeColor = "#999";
    fillColor = "#ccc";
  } else if (status === "reserved") {
    strokeColor = "#ffc107";
    fillColor = "#f2f3a7ff"; // Or "#fff8e1" for light yellow tint
  } else if (status === "held") {
    strokeColor = "#25abe0ff";
    fillColor = "#a6d4f7ff"; // Pale blue for better visibility (optional—swap to "#fff" if unwanted)
  } else { // available
    strokeColor = "#28a745";
    fillColor = "#fff";
  }

  // Override fill if selected
  if (selected) {
    fillColor = "#1FAD3E";
  }

  const strokeWidth = selected ? 3 * scale : (status === "available" ? 2 * scale : 2.5 * scale); // Slightly thicker for held/reserved/sold
  const tabIndex = status === "available" ? 0 : -1;

  const handleKeyDown = (e: React.KeyboardEvent<SVGRectElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        e.preventDefault();
        onNavigate?.(e.key);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onClick();
        break;
    }
  };

  // Debug log (remove in production)
  console.log({ status, strokeColor, fillColor });

  return (
    <>
      <rect
        id={id}
        tabIndex={tabIndex}
        x={x - half}
        y={y - half}
        width={size}
        height={size}
        rx={6 * scale}
        ry={6 * scale}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        onClick={status === "available" ? onClick : undefined}
        onKeyDown={handleKeyDown}
        style={{
          cursor: status === "available" ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}
      />
      <text
        x={x}
        y={y + 5 * scale}
        fontSize={14 * scale}
        fontWeight="bold"
        textAnchor="middle"
        fill={status === "sold" ? "#666" : selected ? "#fff" : "#000"}
        pointerEvents="none"
      >
        {seatNumber}
      </text>
    </>
  );
};

export default Seat;