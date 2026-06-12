import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radius, shadow, spacing, typography } from "@/constants/theme";
import { createDateOptions } from "@/utils/date";

type DatePickerModalProps = {
  visible: boolean;
  selectedDate: string | null;
  title?: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
  allowClear?: boolean;
  onClear?: () => void;
};

export function DatePickerModal({
  visible,
  selectedDate,
  title = "Select Date",
  onSelectDate,
  onClose,
  allowClear = false,
  onClear,
}: DatePickerModalProps) {
  const dateOptions = createDateOptions(7);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          {allowClear ? (
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.option}
              onPress={() => {
                onClear?.();
                onClose();
              }}
            >
              <Text style={styles.optionText}>All dates</Text>
              {!selectedDate ? <Text style={styles.checkmark}>✓</Text> : null}
            </TouchableOpacity>
          ) : null}

          {dateOptions.map((date) => {
            const isSelected = selectedDate === date.value;

            return (
              <TouchableOpacity
                key={date.value}
                activeOpacity={0.75}
                style={styles.option}
                onPress={() => {
                  onSelectDate(date.value);
                  onClose();
                }}
              >
                <View>
                  <Text style={styles.optionText}>{date.label}</Text>
                  <Text style={styles.optionSubtext}>{date.value}</Text>
                </View>

                {isSelected ? <Text style={styles.checkmark}>✓</Text> : null}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.24)",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.md,
    ...shadow.soft,
  },
  title: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: "800",
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  option: {
    minHeight: 56,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "700",
  },
  optionSubtext: {
    marginTop: 2,
    color: colors.muted,
    fontSize: typography.small,
  },
  checkmark: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800",
  },
  cancelButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  cancelText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});