import { BUS_CONFIG } from "@/constants/bus";
import { Booking } from "@/models/Booking";
import { SeatService } from "@/services/SeatService";
import { BusType } from "@/types";

type CreateBookingParams = {
  busType: BusType;
  departureDate: string;
  selectedSeats: string[];
};

export class BookingService {
  static createBooking(params: CreateBookingParams): Booking {
    const totalPrice = SeatService.calculateTotalPrice(
      params.busType,
      params.selectedSeats
    );

    return new Booking({
      id: `${Date.now()}`,
      busType: params.busType,
      departureDate: params.departureDate,
      seats: params.selectedSeats,
      totalPrice,
      createdAt: new Date().toISOString(),
    });
  }

  static getBookedSeatsByDate(
    bookings: Booking[],
    busType: BusType,
    departureDate: string
  ): string[] {
    return bookings
      .filter(
        (booking) =>
          booking.busType === busType &&
          booking.departureDate === departureDate
      )
      .flatMap((booking) => booking.seats);
  }

  static shouldResetSeats(bookedSeats: string[], busType: BusType): boolean {
    return bookedSeats.length >= BUS_CONFIG[busType].totalSeats;
  }

  static calculateTotalRevenue(bookings: Booking[]): number {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0);
  }

  static filterBookingsByDate(
    bookings: Booking[],
    dateFilter: string | null
  ): Booking[] {
    if (!dateFilter) {
      return bookings;
    }

    return bookings.filter((booking) => booking.departureDate === dateFilter);
  }
}