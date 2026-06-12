import { BUS_CONFIG } from "@/constants/bus";
import { Seat } from "@/models/Seat";
import { BusType } from "@/types";

export class Bus {
  readonly type: BusType;

  constructor(type: BusType) {
    this.type = type;
  }

  get config() {
    return BUS_CONFIG[this.type];
  }

  get label() {
    return this.config.label;
  }

  get shortLabel() {
    return this.config.shortLabel;
  }

  get totalSeats() {
    return this.config.totalSeats;
  }

  get layoutDescription() {
    return this.config.layoutDescription;
  }

  get seats() {
    return this.config.rows.flatMap((row) =>
      this.config.columns.map((column) => new Seat(row, column, this.type))
    );
  }
}