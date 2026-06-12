import { StyleSheet, Text, View } from "react-native";

import { BUS_CONFIG } from "@/constants/bus";
import { colors, spacing, typography } from "@/constants/theme";
import { Seat } from "@/models/Seat";
import { BusType, SeatStatus } from "@/types";

import { SeatItem } from "./SeatItem";

type SeatGridProps = {
  busType: BusType;
  seats: Seat[];
  selectedSeats: string[];
  bookedSeats: string[];
  hasSelectedDate: boolean;
  onSeatPress: (seatId: string) => void;
};

export function SeatGrid({
  busType,
  seats,
  selectedSeats,
  bookedSeats,
  hasSelectedDate,
  onSeatPress,
}: SeatGridProps) {
  const config = BUS_CONFIG[busType];

  function getSeatStatus(seatId: string): SeatStatus {
    if (!hasSelectedDate) {
      return "disabled";
    }

    if (bookedSeats.includes(seatId)) {
      return "booked";
    }

    if (selectedSeats.includes(seatId)) {
      return "selected";
    }

    return "available";
  }

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{config.label}</Text>
          <Text style={styles.subtitle}>{config.layoutDescription}</Text>
        </View>

        <Text style={styles.counter}>{selectedSeats.length}/5</Text>
      </View>

      <View style={styles.driverWrapper}>
        <View style={styles.driverPill}>
          <Text style={styles.driverText}>Driver</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {seats.map((seat, index) => {
          const shouldAddAisle = index % 4 === 1;

          return (
            <View key={seat.id} style={styles.seatWrapper}>
              <SeatItem
                seatId={seat.id}
                status={getSeatStatus(seat.id)}
                isExpress={busType === "express"}
                onPress={() => onSeatPress(seat.id)}
              />

              {shouldAddAisle ? <View style={styles.aisle} /> : null}
            </View>
          );
        })}
      </View>

      {!hasSelectedDate ? (
        <Text style={styles.warningText}>
          Select a departure date before choosing seats.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: typography.caption,
    fontWeight: "600",
  },
  counter: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "800",
  },
  driverWrapper: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  driverPill: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  driverText: {
    color: colors.primary,
    fontSize: typography.small,
    fontWeight: "800",
  },
  grid: {
    alignSelf: "center",
    width: 280,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  seatWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  aisle: {
    width: 28,
  },
  warningText: {
    marginTop: spacing.md,
    color: colors.warning,
    fontSize: typography.caption,
    fontWeight: "700",
    textAlign: "center",
  },
});