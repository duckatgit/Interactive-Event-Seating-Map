import { useEffect, useState } from "react";

const STORAGE_KEY = "selectedSeats";

export const useSeats = (maxSelection = 8) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelectedSeats(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const toggleSeat = (seatId: string, status: string) => {
    if (status !== "available") return;
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) return prev.filter(id => id !== seatId);
      if (prev.length >= maxSelection) return prev;
      return [...prev, seatId];
    });
  };

  return { selectedSeats, toggleSeat };
};
