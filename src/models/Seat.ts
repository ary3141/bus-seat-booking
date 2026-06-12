import { BUS_CONFIG } from "@/constants/bus";
import { BusType } from "@/types";

export class Seat {
  readonly id: string;
  readonly row: string;
  readonly column: number;
  readonly busType: BusType;

  constructor(row: string, column: number, busType: BusType) {
    this.row = row;
    this.column = column;
    this.busType = busType;
    this.id = `${row}${column}`;
  }

  get isWindowSeat() {
    return BUS_CONFIG[this.busType].windowColumns.includes(this.column);
  }

  get price() {
    const config = BUS_CONFIG[this.busType];

    return this.isWindowSeat ? config.windowPrice : config.normalPrice;
  }
}