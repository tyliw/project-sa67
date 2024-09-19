import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { MdOutlinePayment } from "react-icons/md";
import { PaymentInterface } from "./interface/IPayment";
import {
  DeleteOrderByID,
  GetOrders,
} from "../food_service/services/https/OrderAPI";
import { OrderInterface } from "../food_service/interfaces/IOrder";
import "./App.css";
import { CreatePayments, GetPayments } from "./services/https/PaymentAPI";
import { Col, message, Modal } from "antd";
import { BookingInterface } from "../room/booking/interfaces/IBooking";
import {
  DeleteBookingByID,
  GetBookings,
  GetRooms,
  UpdateRoom,
} from "../room/booking/services/https";
import { RoomInterface } from "../room/booking/interfaces/IRoom";

function Payment() {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

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

  const fetchOrder = async () => {
    try {
      const response = await GetOrders();
      console.log("API order response for payment: ", response);
      if (Array.isArray(response)) {
        setOrder(response);
      } else {
        setOrder([]);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

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
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBooking();
    fetchRoom();
    fetchOrder();
    fetchPayment();
  }, []); // Empty array ensures it only runs on component mount

  console.log("booking for payment: ", booking);
  console.log("order for payment: ", order);
  console.log("room for payment: ", room);

  const handleDeleteBooking = async (
    booking: BookingInterface,
    RoomID: number
  ) => {
    if (booking.ID) {
      const success = await DeleteBookingByID(booking.ID);
      if (success) {
        const roomUpdate: RoomInterface = {
          ID: RoomID,
          Status: "Vacant", // Update status to Invalid
        };

        const roomPach = await UpdateRoom(roomUpdate);
        console.log("UpdateRoom form payment:", roomPach);
        if (roomPach) {
          message.success("Delete Booking Successfully");
          fetchBooking(); // Refresh the list after deletion
          fetchOrder();
        } else {
          message.success("Update Room Failed");
        }
      } else {
        message.success("Delete Booking Failed");
      }
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (id) {
      const success = await DeleteOrderByID(id);
      if (success) {
        message.success("Delete Order Successfully");
        fetchOrder(); // Refresh the list after deletion
      } else {
        message.success("Delete Order Failed");
      }
    }
  };

  const confirmBooking = (booking: BookingInterface) => {
    Modal.confirm({
      title: "Are you sure you want to Confirm this Room?",
      content: "This action cannot be undone.",
      okText: "Confirm",
      okType: "primary",
      cancelText: "Cancel",
      onOk: () => handleConfirm(booking),
    });
  };

  const confirmCancalBooking = (booking: BookingInterface, RoomID: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteBooking(booking, RoomID),
    });
  };

  const confirmCancalOrder = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteOrder(id),
    });
  };

  const handleConfirm = async (booking: BookingInterface) => {
    const roomPrice = booking.TotalPrice as number;

    console.log("Room Price: ", roomPrice);

    const relatedOrders = order.filter((o) => o.BookingID === booking.ID);
    const ordersTotalPrice = relatedOrders.reduce((total, currentOrder) => {
      // Ensure Price is a number
      const orderPrice = Number(currentOrder.Price) || 0;
      return total + orderPrice;
    }, 0);

    console.log("Orders Total Price: ", ordersTotalPrice);

    const totalAmount = roomPrice + ordersTotalPrice;

    console.log("Total Price: ", totalAmount);

    const paymentData: PaymentInterface = {
      PaymentDate: new Date(),
      TotalAmount: totalAmount,
      PaymentMethod: "credit",
      BookingID: booking.ID as number,
    };

    const res = await CreatePayments(paymentData);
    console.log("CreatePayments Response: ", res);

    if (res) {
      const roomUpdate: RoomInterface = {
        ID: booking.RoomID as number,
        Status: "Vacant", // Update status to Invalid
      };

      const roomPach = await UpdateRoom(roomUpdate);
      console.log("UpdateRoom form payment:", roomPach);
      messageApi.open({
        type: "success",
        content: "Data saved successfully",
      });
      fetchBooking();
      fetchOrder();
      setTimeout(
        () =>
          navigate("/login/receipt", {
            state: {
              paymentID: res.data.ID,
              bookingID: booking.ID,
              roomID: booking.RoomID,
            },
          }),
        500
      );
    } else {
      messageApi.open({
        type: "error",
        content: "Error!",
      });
    }
  };

  // คำนวณราคารวมของการจองแต่ละครั้ง
  const calculateTotalAmount = (booking: BookingInterface) => {
    const roomPrice = booking.TotalPrice as number;

    const relatedOrders = order.filter((o) => o.BookingID === booking.ID);
    const ordersTotalPrice = relatedOrders.reduce((total, currentOrder) => {
      // คำนวณราคารวมจากแต่ละออเดอร์
      const orderPrice = Number(currentOrder.Price) || 0;
      return total + orderPrice;
    }, 0);

    return roomPrice + ordersTotalPrice; // ราคารวมค่าห้องและค่าอาหาร
  };

  return (
    <div className="payment-container">
      {contextHolder}
      <Col>
        <h1 className="payment-header">Payment</h1>
      </Col>
      <div className="payment-content">
        {booking
          .filter((b) => {
            const isNotCheckedOut = !payment.some(
              (pay) => pay.BookingID === b.ID
            );
            return isNotCheckedOut;
          })
          .map((b) => {
            const totalAmount = calculateTotalAmount(b); // คำนวณราคารวม

            return (
              <>
                <div className="payment-card" key={b.ID}>
                  <table className="table-booking-list">
                    <div className="card-header">
                      <tr>
                        <td style={{ width: "500px" }}>
                          <h1 style={{ fontSize: "22px" }}>Booking {b.ID}</h1>
                          <h2 style={{ fontSize: "18px" }}>
                            {b.Customer?.Name} Room {b.Room?.Address}
                          </h2>
                        </td>
                        <td style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                          <div className="container-btn-payment">
                            <button
                              className="btn-confirm-booking"
                              onClick={() => confirmBooking(b)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn-cancel-booking"
                              onClick={() =>
                                confirmCancalBooking(b, b.RoomID as number)
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    </div>
                  </table>

                  <div className="container-order-list">
                    <table className="table-order-list">
                      <thead>
                        <tr>
                          <th> No. </th>
                          <th> Item </th>
                          <th> Qty. </th>
                          <th> Price </th>
                          <th> Amount </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      {order.filter((o) => {
                        const isOrderForCurrentBooking = o.BookingID === b.ID;
                        const isNotCheckedOut = !payment.some(
                          (pay) => pay.BookingID === o.BookingID
                        );
                        return isOrderForCurrentBooking && isNotCheckedOut;
                      }).length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                              No orders available
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        order
                          .filter((o) => {
                            const isOrderForCurrentBooking =
                              o.BookingID === b.ID;
                            const isNotCheckedOut = !payment.some(
                              (pay) => pay.BookingID === o.BookingID
                            );
                            return isOrderForCurrentBooking && isNotCheckedOut;
                          })
                          .map((o, index) => (
                            <tbody key={o.ID}>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{o.Menu?.MenuList}</td>
                                <td>{o.Amount}</td>
                                <td>{o.Menu?.Price.toFixed(2)}</td>
                                <td>
                                  {o.Price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  ฿
                                </td>
                                <td>
                                  <button
                                    className="btn-cancel-order"
                                    onClick={() =>
                                      confirmCancalOrder(o.ID as number)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ))
                      )}
                    </table>
                  </div>

                  {/* เพิ่มราคารวมที่คำนวณไว้ */}
                  <div className="payment-card-total-amount">
                    <h1>
                      totalAmount:{" "}
                      {totalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ฿
                    </h1>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Payment;
