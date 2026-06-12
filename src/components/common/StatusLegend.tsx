import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

const LEGENDS = [
  {
    label: "Available",
    color: colors.availableSeat,
  },
  {
    label: "Selected",
    color: colors.selectedSeat,
  },
  {
    label: "Booked",
    color: colors.bookedSeat,
  },
];

export function StatusLegend() {
  return (
    <View style={styles.container}>
      {LEGENDS.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
  label: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "600",
  },
});