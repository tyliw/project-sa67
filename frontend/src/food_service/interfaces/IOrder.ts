import { MenuInterface } from "./IMenu";

export interface OrderInterface {
  ID?: number;
  OrderDate: Date;
  Amount: number;
  Price: number;
  MenuID: number;
  Menu?: MenuInterface;
  BookingID: number;
}
