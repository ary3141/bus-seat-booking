import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BUS_CONFIG } from "@/constants/bus";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { BusType } from "@/types";

type BusClassSelectorProps = {
  selectedBusType: BusType;
  onSelectBusType: (busType: BusType) => void;
};

export function BusClassSelector({
  selectedBusType,
  onSelectBusType,
}: BusClassSelectorProps) {
  return (
    <View style={styles.container}>
      <BusClassOption
        busType="regular"
        selectedBusType={selectedBusType}
        onSelectBusType={onSelectBusType}
      />

      <BusClassOption
        busType="express"
        selectedBusType={selectedBusType}
        onSelectBusType={onSelectBusType}
      />
    </View>
  );
}

type BusClassOptionProps = {
  busType: BusType;
  selectedBusType: BusType;
  onSelectBusType: (busType: BusType) => void;
};

function BusClassOption({
  busType,
  selectedBusType,
  onSelectBusType,
}: BusClassOptionProps) {
  const isSelected = selectedBusType === busType;
  const config = BUS_CONFIG[busType];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelectBusType(busType)}
      style={[styles.option, isSelected && styles.selectedOption]}
    >
      <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>
        {config.shortLabel}
      </Text>

      <Text
        style={[styles.optionSubtitle, isSelected && styles.selectedSubtext]}
      >
        {config.totalSeats} seats
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xs,
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  option: {
    flex: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800",
  },
  optionSubtitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "600",
  },
  selectedText: {
    color: colors.white,
  },
  selectedSubtext: {
    color: colors.primarySoft,
  },
});