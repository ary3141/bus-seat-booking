import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppHeader } from "@/components/common/AppHeader";
import { AppScreen } from "@/components/common/AppScreen";
import { DatePickerModal } from "@/components/common/DatePickerModal";
import { EmptyState } from "@/components/common/EmptyState";
import { colors, spacing, typography } from "@/constants/theme";
import { Booking } from "@/models/Booking";
import { formatRupiah } from "@/utils/currency";
import { formatDisplayDate } from "@/utils/date";

import { useHistoryViewModel } from "./useHistoryViewModel";

export function HistoryScreen() {
  const viewModel = useHistoryViewModel();

  return (
    <AppScreen>
      <AppHeader
        title="Sales History"
        subtitle="Track booked seats and revenue"
        actionLabel="Book"
        onActionPress={() => router.back()}
      />

      <AppCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Date Filter</Text>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.dateButton}
          onPress={viewModel.openDatePicker}
        >
          <View>
            <Text style={styles.dateLabel}>
              {viewModel.dateFilter ? "Filtered date" : "Showing"}
            </Text>
            <Text
              style={[
                styles.dateValue,
                !viewModel.dateFilter && styles.placeholderText,
              ]}
            >
              {viewModel.dateFilter
                ? formatDisplayDate(viewModel.dateFilter)
                : "All dates"}
            </Text>
          </View>

          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>
      </AppCard>

      <AppCard style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>Total Revenue</Text>
        <Text style={styles.revenueValue}>
          {formatRupiah(viewModel.totalRevenue)}
        </Text>
        <Text style={styles.revenueSubtitle}>
          Generated from {viewModel.filteredBookings.length} booking
          {viewModel.filteredBookings.length === 1 ? "" : "s"}
        </Text>
      </AppCard>

      <Text style={styles.listTitle}>Booking List</Text>

      {viewModel.filteredBookings.length === 0 ? (
        <AppCard>
          <EmptyState
            title="No bookings yet"
            message="Confirmed bookings will appear here."
          />
        </AppCard>
      ) : (
        <View style={styles.list}>
          {viewModel.filteredBookings.map((booking) => (
            <HistoryItem key={booking.id} booking={booking} />
          ))}
        </View>
      )}

      <DatePickerModal
        visible={viewModel.isDatePickerVisible}
        selectedDate={viewModel.dateFilter}
        title="Filter by Date"
        allowClear
        onClear={viewModel.clearDateFilter}
        onSelectDate={viewModel.handleSelectDate}
        onClose={viewModel.closeDatePicker}
      />
    </AppScreen>
  );
}

function HistoryItem({ booking }: { booking: Booking }) {
  return (
    <AppCard style={styles.historyItem}>
      <View style={styles.historyTopRow}>
        <View>
          <Text style={styles.historyType}>
            {booking.busType === "regular" ? "Regular Class" : "Express Class"}
          </Text>
          <Text style={styles.historyDate}>
            {formatDisplayDate(booking.departureDate)}
          </Text>
        </View>

        <Text style={styles.historyTotal}>{formatRupiah(booking.totalPrice)}</Text>
      </View>

      <View style={styles.seatPill}>
        <Text style={styles.seatPillText}>Seats: {booking.seatLabel}</Text>
      </View>
    </AppCard>
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
  revenueCard: {
    marginBottom: spacing.lg,
  },
  revenueLabel: {
    color: colors.muted,
    fontSize: typography.caption,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  revenueValue: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  revenueSubtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: typography.caption,
    fontWeight: "600",
  },
  listTitle: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: "900",
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  historyItem: {
    marginBottom: spacing.md,
  },
  historyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  historyType: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
  },
  historyDate: {
    marginTop: 2,
    color: colors.muted,
    fontSize: typography.caption,
    fontWeight: "600",
  },
  historyTotal: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "900",
  },
  seatPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  seatPillText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: "800",
  },
});