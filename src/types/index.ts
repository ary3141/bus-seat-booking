export type BusType = "regular" | "express";

export type SeatStatus = "available" | "selected" | "booked" | "disabled";

export type Booking = {
  id: string;
  busType: BusType;
  departureDate: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
};

export type DateFilter = string | null;