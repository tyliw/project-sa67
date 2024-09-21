import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // <-- Add this
import { Col, Divider } from "antd";
import { MdBedroomParent } from "react-icons/md";
import { BookingInterface } from "../../../room/booking/interfaces/IBooking";
import { GetBookings, GetTypeRooms } from "../../../room/booking/services/https";
import "./index.css";
import { GetPayments } from "../../../payment/services/https/PaymentAPI";
import { PaymentInterface } from "../../../payment/interface/IPayment";
import { RoomTypesInterface } from "../../../room/booking/interfaces/IRoomTypes";

const BookingList: React.FC = () => {
  const [roomType, setRoomType] = useState<RoomTypesInterface[]>([]);
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const navigate = useNavigate(); // <-- Add this
  const location = useLocation();

  const fetchRoomType = async () => {
    try {
      const response = await GetTypeRooms();
      if (Array.isArray(response)) {
        console.log("GetTypeRooms response: ", response);
        setRoomType(response);
      } else {
        setRoomType([]);
      }
    } catch (error) {
      console.error("Error fetching room type data:", error);
    }
  };

  const fetchBooking = async () => {
    try {
      const response = await GetBookings();
      if (Array.isArray(response)) {
        console.log("GetBookings response: ", response);
        setBooking(response);
      } else {
        setBooking([]);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await GetPayments();
      if (Array.isArray(response)) {
        console.log("GetPayments response: ", response);
        setPayment(response);
      } else {
        setPayment([]);
      }
    } catch (error) {
      console.error("Error fetching payments data:", error);
    }
  };

  useEffect(() => {
    fetchBooking();
    fetchPayment();
    fetchRoomType();
  }, []);

  // ฟังก์ชันค้นหาชื่อประเภทห้องจาก ID
  const getRoomTypeName = (roomTypeID: number | undefined) => {
    const roomTypeItem = roomType.find(rt => rt.ID === roomTypeID);
    return roomTypeItem ? roomTypeItem.Name : "Unknown Type";
  };

  return (
    <>
      <div className="booking-page">
        <Col>
          <h2 className="booking-header">Booking List</h2>
        </Col>
        <Divider />
        <div className="booking-list-page">
          {booking.length === 0 ? (
            <div>No bookings available</div>
          ) : (
            booking
              .filter((book) => {
                const isRoomOccupied = book.Room?.Status === "Occupied";
                const isNotCheckedOut = !payment.some(
                  (pay) => pay.BookingID === book.ID
                );
                return isRoomOccupied && isNotCheckedOut;
              })
              .length === 0 ? (
              <div>No bookings available</div>
            ) : (
              booking
                .filter((book) => {
                  const isRoomOccupied = book.Room?.Status === "Occupied";
                  const isNotCheckedOut = !payment.some(
                    (pay) => pay.BookingID === book.ID
                  );
                  return isRoomOccupied && isNotCheckedOut;
                })
                .map((book) => (
                  <div
                    key={book.ID}
                    className="booking-item-crad"
                    onClick={() => {
                      if (book.ID !== undefined) {
                        navigate(`${location.pathname}/structure/${book.ID}`, {
                          state: { bookingID: book.ID },
                        });
                      }
                    }}
                  >
                    <div className="cardWrap">
                      <div className="card cardLeft">
                        <h1>Booking {book.ID}</h1>
                        <div className="title">
                          <h2>Name</h2>
                          <span>{book.Customer?.Name}</span>
                        </div>
                        <div className="name">
                          <h2>Room Type</h2>
                          <span>{getRoomTypeName(book.Room?.RoomTypesID)}</span>
                        </div>
                        <div className="seat">
                          <h2>{book.Room?.Address}</h2>
                          <span>number</span>
                        </div>
                      </div>
                      <div className="card cardRight">
                        <MdBedroomParent
                          style={{
                            marginTop: "-5px",
                            width: "40px",
                            height: "40px",
                            color: "white",
                          }}
                        />
                        <div className="number">
                          <h3>{book.Room?.Address}</h3>
                          <span>number</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )
          )}

        </div>
      </div>
    </>
  );
};

export default BookingList;
