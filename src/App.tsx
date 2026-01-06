import React, { useEffect, useState } from "react";
import SeatMap from "./components/SeatMap";
import { useSeats } from "./hooks/useSeats";
import Header from "./components/Header";

// Updated to match SeatMap's stricter types
interface SeatData {
  id: string;
  x: number;
  y: number;
  status: "available" | "reserved" | "sold" | "held"; // ← Changed from 'string' to union type
  priceTier: number;
  col: number; 
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

interface Venue {
  venueId: string;
  name: string;
  map: { width: number; height: number };
  sections: Section[];
}

function App() {
  const [venue, setVenue] = useState<Venue | null>(null);
  // const { selectedSeats, toggleSeat } = useSeats();

  useEffect(() => {
    fetch("/venue.json")
      .then(res => res.json())
      .then(data => setVenue(data));
  }, []);

  const seatMap: Record<string, number> = {};
  venue?.sections.forEach(section =>
    section.rows.forEach(row =>
      row.seats.forEach(seat => {
        seatMap[seat.id] = seat.priceTier;
      })
    )
  );

  if (!venue) return <div>Loading venue...</div>;

  return (
    <div>
      <Header />
      <div style={{ padding: 20 }}>       
        <SeatMap sections={venue.sections} />     
      </div>     
    </div>
  );
}

export default App;