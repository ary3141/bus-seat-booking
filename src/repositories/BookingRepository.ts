import { STORAGE_KEYS } from "@/constants/storage";
import { Booking } from "@/models/Booking";
import { StorageService } from "@/services/StorageService";

type StoredBooking = {
  id: string;
  busType: "regular" | "express";
  departureDate: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
};

export class BookingRepository {
  static async getBookings(): Promise<Booking[]> {
    const storedBookings = await StorageService.getItem<StoredBooking[]>(
      STORAGE_KEYS.bookings,
      []
    );

    return storedBookings.map((booking) => new Booking(booking));
  }

  static async saveBookings(bookings: Booking[]): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.bookings, bookings);
  }

  static async addBooking(booking: Booking): Promise<Booking[]> {
    const bookings = await this.getBookings();
    const updatedBookings = [...bookings, booking];

    await this.saveBookings(updatedBookings);

    return updatedBookings;
  }

  static async replaceBookings(bookings: Booking[]): Promise<void> {
    await this.saveBookings(bookings);
  }
}