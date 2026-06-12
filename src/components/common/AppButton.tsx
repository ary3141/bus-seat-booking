import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  leftIcon?: ReactNode;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  style,
  leftIcon,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton, style]}
    >
      {leftIcon}
      <Text style={[styles.title, disabled && styles.disabledTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  disabledButton: {
    backgroundColor: colors.disabledSeat,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  disabledTitle: {
    color: colors.lightMuted,
  },
});