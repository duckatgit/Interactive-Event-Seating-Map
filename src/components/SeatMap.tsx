import React, { useState, useMemo, useCallback,useEffect  } from "react";
import Seat from "./Seat";
import Summary from "./Summary";

interface SeatData {
  id: string;
  col: number;
  x: number;
  y: number;
  priceTier: number;
  status: "available" | "reserved" | "sold"| "held";
}

interface Row {
  index: number;
  seats: SeatData[];
}

interface Section {
  id: string;
  label: string;
  rows: Row[];
}

interface SeatMapProps {
  sections: Section[];
}

const SeatMap: React.FC<SeatMapProps> = ({ sections }) => { 
const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
  const stored = localStorage.getItem("selectedSeats");
  return stored ? JSON.parse(stored) : [];
});
useEffect(() => {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
}, [selectedSeats]);
  // Map of seat ID -> price for summary
  const seatPriceMap: Record<string, number> = {};
  sections.forEach((section) =>
    section.rows.forEach((row) =>
      row.seats.forEach((seat) => {
        seatPriceMap[seat.id] = seat.priceTier;
      })
    )
  );

  const allSeats = useMemo(
    () => sections.flatMap((s) => s.rows.flatMap((r) => r.seats)),
    [sections]
  );

  const getAdjacentSeat = useCallback(
    (currentId: string, direction: string) => {
      const current = allSeats.find((s) => s.id === currentId);
      if (!current) return null;

      let candidates: SeatData[] = [];
      switch (direction) {
        case "ArrowLeft":
          candidates = allSeats.filter(
            (s) =>
              s.status === "available" &&
              s.y === current.y &&
              s.x < current.x
          );
          if (candidates.length === 0) return null;
          return candidates.reduce((prev, curr) => (curr.x > prev.x ? curr : prev));
        case "ArrowRight":
          candidates = allSeats.filter(
            (s) =>
              s.status === "available" &&
              s.y === current.y &&
              s.x > current.x
          );
          if (candidates.length === 0) return null;
          return candidates.reduce((prev, curr) => (curr.x < prev.x ? curr : prev));
        case "ArrowUp":
          candidates = allSeats.filter(
            (s) =>
              s.status === "available" &&
              s.x === current.x &&
              s.y < current.y
          );
          if (candidates.length === 0) return null;
          return candidates.reduce((prev, curr) => (curr.y > prev.y ? curr : prev));
        case "ArrowDown":
          candidates = allSeats.filter(
            (s) =>
              s.status === "available" &&
              s.x === current.x &&
              s.y > current.y
          );
          if (candidates.length === 0) return null;
          return candidates.reduce((prev, curr) => (curr.y < prev.y ? curr : prev));
      }
      return null;
    },
    [allSeats]
  );

  const onNavigate = useCallback(
    (id: string, direction: string) => {
      const nextSeat = getAdjacentSeat(id, direction);
      if (nextSeat) {
        const element = document.getElementById(nextSeat.id);
        element?.focus();
      }
    },
    [getAdjacentSeat]
  );

  const toggleSeat = (id: string, status: string) => {
    if (status !== "available") return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== id));
    } else {
      if (selectedSeats.length >= 8) {
        alert("Maximum select limit is 8 seats");
        return;
      }
      setSelectedSeats([...selectedSeats, id]);
    } 
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.focus();
    }, 0);
  };

  return (
    <div>
      {/* Seat Map */}
      <svg
        width="100%"
        viewBox="0 0 1024 768"
        style={{ border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}
        tabIndex={-1} // Make SVG focusable for initial focus if needed
      >
        {sections.map((section) => (
          <g key={section.id}>
            <text
              x={20}
              y={section.rows[0]?.seats[0]?.y - 20}
              fontSize={18}
              fontWeight="bold"
            >
              {/* {section.label} */}
            </text>
            {section.rows.map((row) =>
              row.seats.map((seat) => (
                <Seat
                  key={seat.id}
                  id={seat.id}
                  x={seat.x}
                  y={seat.y}
                  status={seat.status}
                  price={seat.priceTier}
                  seatNumber={seat.col}
                  selected={selectedSeats.includes(seat.id)}
                  onClick={() => toggleSeat(seat.id, seat.status)}
                  onNavigate={(dir) => onNavigate(seat.id, dir)}
                />
              ))
            )}
          </g>
        ))}
      </svg>
      {/* Summary */}
      <Summary selectedSeats={selectedSeats} seatMap={seatPriceMap} />
    </div>
  );
};

export default SeatMap;