import { Seat } from "../types/venue";

export const SeatDetails = ({ seat }: { seat: Seat | null }) => {
  if (!seat) return <p>Select a seat</p>;

  return (
    <div>
      <strong>{seat.id}</strong>
      <p>Status: {seat.status}</p>
      <p>Price Tier: {seat.priceTier}</p>
    </div>
  );
};
