import { CustomersInterface } from './ICustomer';
import { RoomInterface } from './IRoom';

export interface BookingInterface {
  PaymentMethod: string;
  ID?: number;
  CheckIn: string;  // ISO 8601 date string
  CheckOut: string; // ISO 8601 date string
  TotalPrice?:GLfloat;
  CustomerID: number | null;
  Customer?: CustomersInterface;
  RoomID: number | null;
  Room?: RoomInterface;
  
}
