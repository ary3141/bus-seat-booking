import { BusType } from "@/types";

type BookingParams = {
  id: string;
  busType: BusType;
  departureDate: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
};

export class Booking {
  readonly id: string;
  readonly busType: BusType;
  readonly departureDate: string;
  readonly seats: string[];
  readonly totalPrice: number;
  readonly createdAt: string;

  constructor(params: BookingParams) {
    this.id = params.id;
    this.busType = params.busType;
    this.departureDate = params.departureDate;
    this.seats = params.seats;
    this.totalPrice = params.totalPrice;
    this.createdAt = params.createdAt;
  }

  get seatLabel() {
    return this.seats.join(", ");
  }
}