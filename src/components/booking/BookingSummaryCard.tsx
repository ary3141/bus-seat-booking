import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/common/AppButton";
import { colors, spacing, typography } from "@/constants/theme";
import { formatRupiah } from "@/utils/currency";

type BookingSummaryCardProps = {
  selectedSeats: string[];
  totalPrice: number;
  disabled: boolean;
  onConfirm: () => void;
};

export function BookingSummaryCard({
  selectedSeats,
  totalPrice,
  disabled,
  onConfirm,
}: BookingSummaryCardProps) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Selected Seats</Text>
        <Text style={styles.value}>
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Price</Text>
        <Text style={styles.price}>{formatRupiah(totalPrice)}</Text>
      </View>

      <AppButton
        title="Confirm Booking"
        disabled={disabled}
        onPress={onConfirm}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  label: {
    color: colors.muted,
    fontSize: typography.body,
    fontWeight: "700",
  },
  value: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800",
    textAlign: "right",
  },
  price: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  button: {
    marginTop: spacing.xs,
  },
});