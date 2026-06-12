export type DateOption = {
  value: string;
  label: string;
};

export function getTodayDateValue() {
  return new Date().toISOString().split("T")[0];
}

export function formatDisplayDate(dateValue: string) {
  const date = new Date(dateValue);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function createDateOptions(daysAhead = 7): DateOption[] {
  return Array.from({ length: daysAhead }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    const value = date.toISOString().split("T")[0];

    return {
      value,
      label: formatDisplayDate(value),
    };
  });
}