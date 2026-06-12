import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { MAX_SELECTED_SEATS } from "@/constants/bus";
import { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";
import { BookingService } from "@/services/BookingService";
import { SeatService } from "@/services/SeatService";
import { BusType } from "@/types";

export function useBookingViewModel() {
  const [busType, setBusType] = useState<BusType>("regular");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const seats = useMemo(() => {
    return SeatService.getSeats(busType);
  }, [busType]);

  const bookedSeats = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const rawBookedSeats = BookingService.getBookedSeatsByDate(
      bookings,
      busType,
      selectedDate
    );

    if (BookingService.shouldResetSeats(rawBookedSeats, busType)) {
      return [];
    }

    return rawBookedSeats;
  }, [bookings, busType, selectedDate]);

  const totalPrice = useMemo(() => {
    return SeatService.calculateTotalPrice(busType, selectedSeats);
  }, [busType, selectedSeats]);

  const hasSelectedDate = Boolean(selectedDate);

  const canConfirmBooking = hasSelectedDate && selectedSeats.length > 0;

  useEffect(() => {
    loadBookings();
  }, []);

  function handleSelectBusType(nextBusType: BusType) {
    setBusType(nextBusType);
    setSelectedSeats([]);
  }

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setSelectedSeats([]);
  }

  function openDatePicker() {
    setIsDatePickerVisible(true);
  }

  function closeDatePicker() {
    setIsDatePickerVisible(false);
  }

  function handleSeatPress(seatId: string) {
    if (!selectedDate) {
      Alert.alert("Select date first", "Please select departure date first.");
      return;
    }

    if (bookedSeats.includes(seatId)) {
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((currentSeats) =>
        currentSeats.filter((seat) => seat !== seatId)
      );
      return;
    }

    if (selectedSeats.length >= MAX_SELECTED_SEATS) {
      Alert.alert(
        "Maximum seats reached",
        `You can only select up to ${MAX_SELECTED_SEATS} seats at a time.`
      );
      return;
    }

    setSelectedSeats((currentSeats) => [...currentSeats, seatId]);
  }

  async function handleConfirmBooking() {
    if (!selectedDate) {
      Alert.alert("Select date first", "Please select departure date first.");
      return;
    }

    if (selectedSeats.length === 0) {
      Alert.alert("No seats selected", "Please select at least one seat.");
      return;
    }

    try {
      setIsLoading(true);

      const booking = BookingService.createBooking({
        busType,
        departureDate: selectedDate,
        selectedSeats,
      });

      const updatedBookings = await BookingRepository.addBooking(booking);

      setBookings(updatedBookings);
      setSelectedSeats([]);

      const latestBookedSeats = BookingService.getBookedSeatsByDate(
        updatedBookings,
        busType,
        selectedDate
      );

      if (BookingService.shouldResetSeats(latestBookedSeats, busType)) {
        Alert.alert(
          "Booking confirmed",
          "All seats for this bus type and date are fully booked, so seat availability has been reset."
        );
        return;
      }

      Alert.alert("Booking confirmed", "Your seats have been booked.");
    } catch {
      Alert.alert("Error", "Failed to confirm booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadBookings() {
    try {
      const storedBookings = await BookingRepository.getBookings();
      setBookings(storedBookings);
    } catch {
      Alert.alert("Error", "Failed to load bookings.");
    }
  }

  return {
    busType,
    selectedDate,
    selectedSeats,
    bookings,
    seats,
    bookedSeats,
    totalPrice,
    hasSelectedDate,
    canConfirmBooking,
    isDatePickerVisible,
    isLoading,

    handleSelectBusType,
    handleSelectDate,
    handleSeatPress,
    handleConfirmBooking,
    openDatePicker,
    closeDatePicker,
  };
}