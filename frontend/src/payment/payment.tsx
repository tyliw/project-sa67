import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { PaymentInterface } from "./interface/IPayment";
import {
  DeleteBookingByID,
  GetBookings,
} from "../food_service/services/https/BookingAPI";
import { BookingInterface } from "../food_service/interfaces/IBooking";
import {
  DeleteOrderByID,
  GetOrders,
} from "../food_service/services/https/OrderAPI";
import { OrderInterface } from "../food_service/interfaces/IOrder";
import "./App.css";
import { CreatePayments } from "./services/https/PaymentAPI";
import { message, Modal } from "antd";

function Payment() {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      console.log("API booking response for payment: ", response);
      // Since the response is an array, directly use it
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

  useEffect(() => {
    fetchBooking();
    fetchOrder();
  }, []); // Empty array ensures it only runs on component mount

  console.log("booking for payment: ", booking);
  console.log("order for payment: ", order);

  // const [selectedStatus, setSelectedStatus] = useState("Confirmed");

  const handleDeleteBooking = async (id: number) => {
    if (id) {
      const success = await DeleteBookingByID(id);
      if (success) {
        message.success('Delete Booking Successfully');
        fetchBooking(); // Refresh the list after deletion
      } else {
        message.success('Delete Booking Failed');
      }
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (id) {
      const success = await DeleteOrderByID(id);
      if (success) {
        message.success('Delete Order Successfully');
        fetchOrder(); // Refresh the list after deletion
      } else {
        message.success('Delete Order Failed');
      }
    }
  };

  const confirmCancalBooking = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteBooking(id),
    });
  };

  const confirmCancalOrder = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteOrder(id),
    });
  };


  const handleConfirm = async (booking_id: number) => {
    // Find the booking based on the selected booking ID
    const selectedBooking = booking.find((b) => b.ID === booking_id);
    
    // Calculate room price from the selected booking (if available)
    const roomPrice = selectedBooking?.Room?.TotalPrice || 0;
  
    // Filter orders related to the selected booking (if applicable)
    const relatedOrders = order.filter((o) => o.BookingID === booking_id);
  
    // Calculate total price from all orders
    const ordersTotalPrice = relatedOrders.reduce((total, currentOrder) => {
      return total + currentOrder.Price;
    }, 0);
  
    // Calculate the total amount (room price + orders total price)
    const totalAmount = roomPrice + ordersTotalPrice;
  
    // Prepare payment data
    const paymentData: PaymentInterface = {
      PaymentDate: new Date(),
      TotalAmount: totalAmount, // Use the calculated totalAmount here
      PaymentMethod: "credit",
      BookingID: booking_id,
    };
  
    // Send the payment data to the API
    const res = await CreatePayments(paymentData);
    if (res) {
      messageApi.open({
        type: "success",
        content: "Data saved successfully",
      });
      setTimeout(() => navigate("/login/receipt"), 500);
    } else {
      messageApi.open({
        type: "error",
        content: "Error!",
      });
    }
  };
  

  return (
    <div className="app-container">
      {contextHolder}
      <header>
        <h1>Payment System</h1>
        <MdOutlinePayment className="icon-style" />
      </header>
      <section className="payment-section">
        <h2>Booking</h2>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>CheckIn</th>
              <th>CheckOut</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Room Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking) => (
              <tr key={booking.ID}>
                <td>{booking.ID}</td>
                <td>{booking.CheckIn}</td>
                <td>{booking.CheckOut}</td>
                <td>{booking.Customer?.Name}</td>
                <td>{booking.Room?.Address}</td>
                <td>{booking.Room?.TotalPrice}</td>
                <td>
                  <button onClick={() => handleConfirm(booking.ID)}>
                    Confirm
                  </button>

                  <button
                    className="btn-delete-booking"
                    onClick={() => confirmCancalBooking(booking.ID)}
                  >
                    Cancel
                  </button>
                </td>
                {/* <td>{item.totalAmount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className="order-table">
            <h2>Order</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Mene Image</th>
                  <th>Mene</th>
                  <th>Amount</th>
                  <th>Price</th>
                  {/* <th>OrderDate</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order.ID}>
                    <td>{order.ID}</td>
                    <td>
                      <img
                        className="payment-menu-image"
                        src={order.Menu?.ImageMenu}
                        alt=""
                      />
                    </td>
                    <td>{order.Menu?.MenuList}</td>
                    <td>{order.Amount}</td>
                    <td>{order.Price.toFixed(2)}</td>
                    {/* <td>{order.OrderDate}</td> */}
                    <td>
                      <button
                        className="btn-delete-order"
                        onClick={() => confirmCancalOrder(order.ID)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <button onClick={() => setSelectedStatus("Pending")}>Pending</button> */}
          {/* <button onClick={() => setSelectedStatus("Cancelled")}>Cancel</button> */}
          {/* <button onClick={() => setShowReceipt(true)}>Show Receipt</button> */}
        </div>
        {/* <div className="status-display">
          Status:{" "}
          <span className={`${selectedStatus.toLowerCase()}`}>
            {selectedStatus}
          </span>
        </div> */}
      </section>
    </div>
  );
}
export default Payment;
