import { Bus } from "@/models/Bus";
import { Seat } from "@/models/Seat";
import { BusType } from "@/types";

export class SeatService {
  static getSeats(busType: BusType): Seat[] {
    const bus = new Bus(busType);

    return bus.seats;
  }

  static getSeatById(busType: BusType, seatId: string): Seat | undefined {
    return this.getSeats(busType).find((seat) => seat.id === seatId);
  }

  static calculateSeatPrice(busType: BusType, seatId: string): number {
    const seat = this.getSeatById(busType, seatId);

    return seat?.price ?? 0;
  }

  static calculateTotalPrice(busType: BusType, seatIds: string[]): number {
    return seatIds.reduce((total, seatId) => {
      return total + this.calculateSeatPrice(busType, seatId);
    }, 0);
  }
}