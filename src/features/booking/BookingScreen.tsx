import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppHeader } from "@/components/common/AppHeader";
import { AppScreen } from "@/components/common/AppScreen";
import { DatePickerModal } from "@/components/common/DatePickerModal";
import { StatusLegend } from "@/components/common/StatusLegend";
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard";
import { BusClassSelector } from "@/components/booking/BusClassSelector";
import { SeatGrid } from "@/components/booking/SeatGrid";
import { colors, spacing, typography } from "@/constants/theme";
import { formatDisplayDate } from "@/utils/date";

import { useBookingViewModel } from "./useBookingViewModel";

export function BookingScreen() {
    const viewModel = useBookingViewModel();

    return (
        <AppScreen>
            <AppHeader
                title="Bus Seat Booking"
                subtitle="Choose your class, date, and seat"
                actionLabel="History"
                onActionPress={() => router.push("/history")}
            />

            <BusClassSelector
                selectedBusType={viewModel.busType}
                onSelectBusType={viewModel.handleSelectBusType}
            />

            <AppCard style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Departure Date</Text>

                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.dateButton}
                    onPress={viewModel.openDatePicker}
                >
                    <View>
                        <Text style={styles.dateLabel}>
                            {viewModel.selectedDate ? "Selected date" : "Choose date"}
                        </Text>
                        <Text
                            style={[
                                styles.dateValue,
                                !viewModel.selectedDate && styles.placeholderText,
                            ]}
                        >
                            {viewModel.selectedDate
                                ? formatDisplayDate(viewModel.selectedDate)
                                : "Please select departure date"}
                        </Text>
                    </View>

                    <Text style={styles.chevron}>⌄</Text>
                </TouchableOpacity>
            </AppCard>

            <StatusLegend />

            <AppCard style={styles.sectionCard}>
                <SeatGrid
                    busType={viewModel.busType}
                    seats={viewModel.seats}
                    selectedSeats={viewModel.selectedSeats}
                    bookedSeats={viewModel.bookedSeats}
                    hasSelectedDate={viewModel.hasSelectedDate}
                    onSeatPress={viewModel.handleSeatPress}
                />
            </AppCard>

            <AppCard>
                <BookingSummaryCard
                    selectedSeats={viewModel.selectedSeats}
                    totalPrice={viewModel.totalPrice}
                    disabled={!viewModel.canConfirmBooking || viewModel.isLoading}
                    onConfirm={viewModel.handleConfirmBooking}
                />
            </AppCard>

            <DatePickerModal
                visible={viewModel.isDatePickerVisible}
                selectedDate={viewModel.selectedDate}
                onSelectDate={viewModel.handleSelectDate}
                onClose={viewModel.closeDatePicker}
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    sectionCard: {
        marginBottom: spacing.md,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.sectionTitle,
        fontWeight: "800",
        marginBottom: spacing.md,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        backgroundColor: colors.cardSoft,
        padding: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dateLabel: {
        color: colors.muted,
        fontSize: typography.small,
        fontWeight: "700",
        marginBottom: 2,
    },
    dateValue: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: "800",
    },
    placeholderText: {
        color: colors.lightMuted,
    },
    chevron: {
        color: colors.primary,
        fontSize: 22,
        fontWeight: "800",
    },
});