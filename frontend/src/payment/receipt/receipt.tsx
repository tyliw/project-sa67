import { useEffect, useState } from 'react';
import './App.css';
// import Screenshot from './assets/qr-code.png';
import { PaymentInterface } from '../interface/IPayment';
import { GetPaymentById } from '../services/https/PaymentAPI';
import { BookingInterface } from '../../food_service/interfaces/IBooking';
import { OrderInterface } from '../../food_service/interfaces/IOrder';
import { GetBookings } from '../../food_service/services/https/BookingAPI';
import { GetOrders } from '../../food_service/services/https/OrderAPI';
import { useLocation } from 'react-router-dom';

const Receipt = () => {
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface | null>(null);

  const location = useLocation();
  const paymentID = location.state?.paymentID;

  useEffect(() => {
    if (paymentID) {
      fetchPayment(paymentID);
    }
    fetchBooking();
    fetchOrder();
  }, [paymentID]);

  const fetchPayment = async (id: number) => {
    try {
      const response = await GetPaymentById(id);
      console.log("API GetPaymentById for Receipt: ", response);
      setPayment(response);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };
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

  
  console.log("booking for receipt: ", booking);
  console.log("order for receipt: ", order);
  console.log("payment for receipt: ", payment)

  // const items = [
  //   { name: 'Matcha Grande', quantity: 2, price: 24.50 },
  //   { name: 'Muffin Blueberry', quantity: 1, price: 15.13 },
  //   { name: 'Matcha Grande', quantity: 2, price: 24.50 },
  //   { name: 'Muffin Blueberry', quantity: 1, price: 15.13 }
  // ];

  // const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  // const tip = subtotal * 0.10;
  // const total = subtotal + tip;

  return (
    <div className="receipt">
      <header className="receipt-header">
        <h1>Receipt</h1>
      </header>
      {booking.map((booking) => (
          <div key={booking.ID} className="receipt-item">
            <span>Number {booking.Room?.Address}</span>
            <span>- {booking.Room?.RoomTypes?.Name}</span>
            <span>${booking.Room?.TotalPrice}</span>
          </div>
        ))}
      <div className="receipt-divider"></div>
        
      <div className="receipt-body">
        {order.map((order) => (
          <div key={order.ID} className="receipt-item">
            <span>{order.Menu?.MenuList}</span>
            <span>x{order.Amount}</span>
            <span>${order.Menu?.Price}</span>
          </div>
        ))}
        <div className="receipt-divider">
          <div><span>Total Payment</span><span>$</span></div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default Receipt;