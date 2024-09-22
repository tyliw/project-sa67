import React, { useState, useEffect } from 'react';
import { MeetingInterface } from '../../interface/IMeetingRoom';
import { GetMeetingRooms } from '../../service/https';
import './index.css'
import { GrClose } from "react-icons/gr";
import Booking from './booking/booking';
import { IoFileTrayFullOutline } from "react-icons/io5";
import { DeleteBookingByID, GetBooking } from '../../service/https/indexBooking';
import { BookingInterface } from '../../interface/IBooking';
import { Duration } from '../../interface/IDuration';
import { CustomerInterface } from '../../interface/ICustomer';
import { GetCustomer } from '../../service/https/indexCustomer';
import { GetDuration } from '../../service/https/indexDuration';
import moment from 'moment';
import { Modal } from 'antd';
const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');       
    return `${year}-${month}-${day}`;
};

function Index() {
    const [rooms, setRooms] = useState<MeetingInterface[]>([]);
    const [booking, setBooking] = useState<BookingInterface[]>([]);
    const [customers, setCustomer] = useState<CustomerInterface[]>([]);
    const [duration, setDuration] = useState<Duration[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<MeetingInterface | null>(null);
    const [switchRoom , setSwitchRoom] = useState<boolean>(true);
    const [switchList , setSwitchList] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingIdToCancel, setBookingIdToCancel] = useState<number | null>(null);
    const [imageSrc, setImageSrc] = useState('');

    const onClickSwitchA = () => {
        setSwitchRoom(true);
        setSwitchList(true);
    };

    const onClickSwitchB = () => {
        setSwitchList(false);
        setSwitchRoom(false);
    };

    const onClickShowPopup = (room: MeetingInterface) => {
        setSelectedRoom(room);
        setShowPopup(true);
    };

    const onClickClosePopup = () => {
        setShowPopup(false);
        setSelectedRoom(null);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedDate(event.target.value);
    };
    const showConfirmModal = (id: number) => {
        setBookingIdToCancel(id);
        Modal.confirm({
            title: 'Confirm Cancellation',
            content: 'Are you sure you want to cancel this booking?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => handleCancelBooking(id),
        });
    };

    const handleCancelBooking = async (id: number) => {
        try {
            console.log('Cancel booking with ID:', id);
            const res = await DeleteBookingByID(id);
            if (res) {
                console.log('Booking canceled successfully:', res);
                fetchBooking(); // Refresh bookings
            } else {
                console.error('Failed to cancel booking');
                setError('Failed to cancel booking.');
            }
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            setError('An error occurred while canceling the booking.');
        }
    };

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const res = await GetMeetingRooms();
            if (res) {
                setRooms(res);              
                res.forEach( room => {
                    console.log(room.Image);
                });
            }
            
        } catch (error) {
            console.error('Failed to fetch meeting rooms:', error);
            setError('Failed to fetch meeting rooms.');
        } finally {
            setLoading(false);
        }
    };

    const fetchBooking = async () => {
        try {
            setLoading(true);
            const res = await GetBooking();
            if (res) {
                setBooking(res);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            setError('Failed to fetch bookings.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomer = async () => {
        try {
            setLoading(true);
            const res = await GetCustomer();
            if (res) {
                setCustomer(res);
            }
        } catch (error) {
            console.error('Failed to fetch customers:', error);
            setError('Failed to fetch customers.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDuration = async () => {
        try {
            setLoading(true);
            const res = await GetDuration();
            if (res) {
                setDuration(res);
            }
        } catch (error) {
            console.error('Failed to fetch durations:', error);
            setError('Failed to fetch durations.');
        } finally {
            setLoading(false);
        }
    };

    const onClickCancel = async (value: number) => {
        try {
            console.log('Cancel booking with ID:', value);
            const res = await DeleteBookingByID(value);
            if (res) {
                console.log('Booking canceled successfully:', res);
                fetchBooking(); // Refresh bookings
            } else {
                console.error('Failed to cancel booking');
                setError('Failed to cancel booking.');
            }
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            setError('An error occurred while canceling the booking.');
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [selectedDate]);

    useEffect(() => {
        fetchBooking();
        fetchCustomer();
        fetchDuration();
    }, []);



    return (
        <div style={{ width: '100%', height: '100%', padding:'10px'}}> 
            <div className='booking_list'>
                <div>
                    <span onClick={onClickSwitchA}>Rooms</span>
                    <span onClick={onClickSwitchB}>List</span>
                </div>
                <div>
                <div className='FindeTime'>
                        <div className="DateTime">
                            <input 
                                type="date" 
                                className="Date" 
                                value={selectedDate} 
                                onChange={handleDateChange} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {switchRoom && switchList &&(
                <div className='BookingShowData'>
                    <div className="BookingShowDataFlex" >
                        {rooms.length > 0 ? (
                            rooms.map(room => (
                                <div
                                    className='BookingList'
                                    onClick={() => onClickShowPopup(room)}
                                    key={room.ID}
                                    style={{ 
                                        backgroundImage: `url(${room.Image})`, 
                                        backgroundSize: 'cover',      // ปรับขนาดภาพพื้นหลังให้ครอบคลุมพื้นที่
                                        backgroundPosition: 'center', // จัดตำแหน่งภาพให้อยู่ตรงกลาง
                                        position: 'relative',
                                    }}     
                                >
                                <p>
                                    {room.RoomName} 
                                </p>
                            </div>
                            
                            ))
                            
                        ) : (
                            <div style={{width:'200%',height:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <IoFileTrayFullOutline style={{width:'200px',height:'200px',opacity:'0.3'}}/>
                                <p style={{opacity:'0.3'}}>No Available Space</p>
                            </div>
                        )}
                    </div>
                    {showPopup && selectedRoom &&
                        <div className='BookingPopup'>
                            <div className='BookingSubmit'>
                                <Booking room={selectedRoom}/>
                                <div className='CloseBooking' onClick={onClickClosePopup}>
                                    <GrClose/>
                                </div>
                            </div>
                        </div>}
            </div>
                
            )}
            {!switchList && !switchRoom &&
                <div className='BookingShowDataList'>
                    <div className="BookingColumn">
                        <p>No.</p>
                        <p>Date</p>
                        <p>Duration</p>
                        <p>People</p>
                        <p>Room</p>
                        <p>Name</p>
                        <p>Tel</p>
                        <p>Email</p>
                        <p></p>
                    </div>
                        {booking.length > 0 ? (
                            booking.map((booking, index) => (
                                <div className="BookingRow" key={booking.ID}>
                                    <p>{index+1}</p>
                                    <p>{moment(booking.DateTime).format('DD/MM/YYYY')}</p>
                                    <p>{duration.find((r) => booking.DurationID === r.ID) ? 
                                        `${duration.find((r) => booking.DurationID === r.ID)?.StartTime} - ${duration.find((r) => booking.DurationID === r.ID)?.EndTime}` 
                                        : 'Duration not found'}
                                    </p>  
                                    <p>{booking.TotalPeople}</p>
                                    <p>{rooms.find((r) => booking.MeetingRoomID === r.ID)?.RoomName || 'Room not found'}</p>
                                    <p>{customers.find((r) => booking.CustomerID === r.ID)?
                                        `${customers.find((r) => booking.CustomerID === r.ID)?.First_Name}  ${customers.find((r) => booking.CustomerID === r.ID)?.
                                            Last_Name
                                        }` 
                                        : 'Duration not found'}
                                    </p>
                                    <p>{customers.find((r) => booking.CustomerID === r.ID)?.Tel || 'Room not found'}</p>
                                    <p>{customers.find((r) => booking.CustomerID === r.ID)?.Email || 'Room not found'}</p> 
                                    <span onClick={() => showConfirmModal(booking.ID)}>Cancel</span>                            
                                </div>
                            ))
                        ) : (
                            <div style={{width:'100%',height:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <IoFileTrayFullOutline style={{width:'200px',height:'200px',opacity:'0.3'}}/>
                                <p style={{opacity:'0.3'}}>No Available Space</p>
                            </div>
                            )
                        }  

                </div>
            }
        </div>
    );
}

export default Index;
