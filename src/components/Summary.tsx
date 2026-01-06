import React from "react";

interface SummaryProps {
  selectedSeats: string[];
  seatMap: Record<string, number>;
}

const Summary: React.FC<SummaryProps> = ({ selectedSeats, seatMap }) => {
  const total = selectedSeats.reduce((sum, id) => sum + (seatMap[id] || 0), 0);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Selected Seats ({selectedSeats.length}/8)</h3>
      <ul>
        {selectedSeats.map(id => (
          <li key={id}>
            {id} - ${seatMap[id]}
          </li>
        ))}
      </ul>
      <strong>Total: ${total}</strong>
       <div style={{ marginTop: 5 }}>
  
  <div style={{ display: "flex", gap: 15, flexWrap: "wrap", alignItems: "center" }}>
    <h4>Status:</h4>
    {/* Sold */}
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 20,
        height: 20,
        backgroundColor: "#ccc",
        border: "1px solid #999",
        display: "inline-block"
      }}></span>
      Sold
    </div>

    {/* Reserved */}
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 20,
        height: 20,
        backgroundColor: "#f2f3a7",
        border: "1px solid #ffc107",
        display: "inline-block"
      }}></span>
      Reserved
    </div>

    {/* Held */}
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 20,
        height: 20,
        backgroundColor: "#a6d4f7",
        border: "1px solid #25abe0",
        display: "inline-block"
      }}></span>
      Held
    </div>

    {/* Available */}
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 20,
        height: 20,
        backgroundColor: "#fff",
        border: "1px solid #28a745",
        display: "inline-block"
      }}></span>
      Available
    </div>

  </div>
</div>

    </div>
  );
};

export default Summary;
