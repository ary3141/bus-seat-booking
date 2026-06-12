import { useEffect, useMemo, useState } from "react";

import { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";
import { BookingService } from "@/services/BookingService";

export function useHistoryViewModel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const filteredBookings = useMemo(() => {
    return BookingService.filterBookingsByDate(bookings, dateFilter);
  }, [bookings, dateFilter]);

  const totalRevenue = useMemo(() => {
    return BookingService.calculateTotalRevenue(filteredBookings);
  }, [filteredBookings]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const storedBookings = await BookingRepository.getBookings();
    setBookings(storedBookings);
  }

  function openDatePicker() {
    setIsDatePickerVisible(true);
  }

  function closeDatePicker() {
    setIsDatePickerVisible(false);
  }

  function handleSelectDate(date: string) {
    setDateFilter(date);
  }

  function clearDateFilter() {
    setDateFilter(null);
  }

  return {
    bookings,
    filteredBookings,
    dateFilter,
    totalRevenue,
    isDatePickerVisible,

    openDatePicker,
    closeDatePicker,
    handleSelectDate,
    clearDateFilter,
  };
}