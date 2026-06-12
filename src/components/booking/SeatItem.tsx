import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";
import { SeatStatus } from "@/types";

type SeatItemProps = {
  seatId: string;
  status: SeatStatus;
  isExpress?: boolean;
  onPress: () => void;
};

export function SeatItem({
  seatId,
  status,
  isExpress = false,
  onPress,
}: SeatItemProps) {
  const isDisabled = status === "booked" || status === "disabled";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.seat,
        isExpress && styles.expressSeat,
        status === "selected" && styles.selectedSeat,
        status === "booked" && styles.bookedSeat,
        status === "disabled" && styles.disabledSeat,
      ]}
    >
      <Text
        style={[
          styles.seatText,
          status === "selected" && styles.selectedSeatText,
          status === "booked" && styles.bookedSeatText,
          status === "disabled" && styles.disabledSeatText,
        ]}
      >
        {seatId}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  seat: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.availableSeat,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing.xs,
  },
  expressSeat: {
    height: 72,
  },
  selectedSeat: {
    backgroundColor: colors.selectedSeat,
  },
  bookedSeat: {
    backgroundColor: colors.bookedSeat,
  },
  disabledSeat: {
    backgroundColor: colors.disabledSeat,
    opacity: 0.55,
  },
  seatText: {
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  selectedSeatText: {
    color: colors.white,
  },
  bookedSeatText: {
    color: colors.white,
  },
  disabledSeatText: {
    color: colors.lightMuted,
  },
});
