import { useState, useEffect } from "react";
import { Seat } from "../types/venue";

const STORAGE_KEY = "selectedSeats";
const MAX_SELECTION = 8;

export function useSeatSelection() {
  const [selected, setSelected] = useState<Seat[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSelected(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
  }, [selected]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status !== "available") return;

    setSelected((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      if (exists) return prev.filter((s) => s.id !== seat.id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, seat];
    });
  };

  return { selected, toggleSeat };
}
