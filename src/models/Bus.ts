import { BusType } from "@/types";

export const MAX_SELECTED_SEATS = 5;

export const BUS_CONFIG: Record<
  BusType,
  {
    label: string;
    shortLabel: string;
    totalSeats: number;
    rows: string[];
    columns: number[];
    windowColumns: number[];
    normalPrice: number;
    windowPrice: number;
    layoutDescription: string;
  }
> = {
  regular: {
    label: "Regular Class",
    shortLabel: "Regular",
    totalSeats: 20,
    rows: ["A", "B", "C", "D", "E"],
    columns: [1, 2, 3, 4],
    windowColumns: [1, 4],
    normalPrice: 100000,
    windowPrice: 150000,
    layoutDescription: "20 seats • 10 left + 10 right",
  },

  express: {
    label: "Express Class",
    shortLabel: "Express",
    totalSeats: 12,
    rows: ["A", "B", "C"],
    columns: [1, 2, 3, 4],
    windowColumns: [1, 4],
    normalPrice: 150000,
    windowPrice: 200000,
    layoutDescription: "12 seats • 6 left + 6 right",
  },
};