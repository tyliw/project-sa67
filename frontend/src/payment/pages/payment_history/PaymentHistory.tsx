import { useEffect, useState } from "react";
import "./App.css";
import { BookingInterface } from "../../../room/booking/interfaces/IBooking";
import { RoomInterface } from "../../../room/booking/interfaces/IRoom";
import { GetBookings, GetRooms } from "../../../room/booking/services/https";
import { GetPayments } from "../../services/https/PaymentAPI";
import { PaymentInterface } from "../../interface/IPayment";

function PaymentHistory() {
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);

  const fetchPayment = async () => {
    try {
      const response = await GetPayments();
      console.log("API payment response for payment: ", response);
      if (Array.isArray(response)) {
        setPayment(response);
      } else {
        console.error("API did not return expected array format:", response);
        setPayment([]);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      console.log("API booking response for payment: ", response);
      if (Array.isArray(response)) {
        setBooking(response);
      } else {
        console.error("API did not return expected array format:", response);
        setBooking([]);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const fetchRoom = async () => {
    try {
      const response = await GetRooms();
      console.log("GetRooms response: ", response);
      if (Array.isArray(response)) {
        setRoom(response);
      } else {
        console.error("API did not return expected array format:", response);
        setRoom([]);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchPayment();
    fetchBooking();
    fetchRoom();
  }, []); // Empty array ensures it only runs on component mount

  console.log("payment history: ", payment);
  console.log("booking for payment: ", booking);
  console.log("room for payment: ", room);

  return (
    <div className="payment-history">
      <header className="payment-history-header">
        <h1>Payment Transaction History</h1>
      </header>

      <table className="payment-history-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Customer</th>
            <th>Room</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {payment && payment.length > 0 ? (
            payment.map((p, index) => {
              const bookingDetails = booking.find((b) => b.ID === p.BookingID);
              const roomDetails = room.find((r) => r.ID === bookingDetails?.Room?.ID);
              return (
                <tr key={p.ID || index}>
                  <td>{p.ID ?? "N/A"}</td>
                  <td>{bookingDetails?.Customer?.Name || "N/A"}</td>{" "}
                  {/* Provide 'N/A' if Name is undefined */}
                  <td>{roomDetails?.Address || "N/A"}</td>
                  <td> {p.TotalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</td>
                  <td>{p.PaymentMethod || "N/A"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={{textAlign:"center"}} colSpan={5}>No payment transactions available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <div className="receipt-total"></div> */}
    </div>
  );
}

export default PaymentHistory;
