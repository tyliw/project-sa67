import React, { useState, useEffect } from 'react';
import { CgMathPlus } from "react-icons/cg";
import './Meeting_Room.css';
import { GetMeetingRooms } from '../../service/https';
import EditPopup from './edit/index'; // Assuming Edit is the popup component
import { MeetingInterface } from '../../interface/IMeetingRoom';
import CreatePopup from './create/create';
import { IoFileTrayFullOutline } from "react-icons/io5";
const Meeting_Room: React.FC = () => {
    const [rooms, setRooms] = useState<MeetingInterface[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupNew, setShowPopupNew] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<MeetingInterface | null>(null);

    // Function to open popup for a new room
    const openPopupNew = () => {
        setShowPopupNew(true);
    };

    // Function to close popup for a new room
    const closePopupNew = () => {
        setShowPopupNew(false);
    };

    // Open popup with selected room for editing
    const openPopup = (room: MeetingInterface) => {
        setSelectedRoom(room);
        setShowPopup(true);
    };

    // Close popup for editing
    const closePopup = () => {
        setShowPopup(false);
        setSelectedRoom(null);
    };

    // Fetch meeting rooms on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            const res = await GetMeetingRooms();
            if (res) {
                setRooms(res);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className='pageMeetingStyle'>
            <div className="HeadTitleNew">
                <p>Details</p>
                <div className="bookingAndNew">
                    <div className='LinkToBooking' onClick={openPopupNew}>
                        <CgMathPlus className='Icons'/>
                        <p>New</p>
                    </div>
                </div>
            </div>
            <div className="BodyData">
                <div className="MeetingRoomCard">
                    <div className="CowTitle NameCow">
                        <p>No.</p>
                        <p>Room Name</p>
                        <p>Details</p>
                        <p>Room Size</p>
                        <p>Capacity</p>
                        <p>Chair</p>
                        <p>AirCondition</p>
                        <p>Type</p>
                        <p></p>
                    </div>
                </div>
                <div className="BodyDataRow">
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <div className="MeetingRoomCard" key={room.ID}>
                        <div className="RowData DataAll">
                            <p>{index + 1}</p>
                            <p>{room.RoomName}</p>
                            <p>{room.Detail}</p>
                            <p>{room.RoomSize}</p>
                            <p>{room.Capacity}</p>
                            <p>{room.Chair}</p>
                            <p>{room.AirCondition}</p>
                            <p>{room.Type}</p>
                            <div className="LinkToEdit" onClick={() => openPopup(room)}>Edit</div>
                        </div>
                        </div>
                    ))
                ) : (
                    <div style={{width:'100%',height:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <IoFileTrayFullOutline style={{width:'200px',height:'200px',opacity:'0.3'}}/>
                        <p style={{opacity:'0.3'}}>No rooms available.</p>
                    </div>
                    )}
                </div>
            </div>
            
            {showPopup && selectedRoom && (
                <div className='EditPOPUP'>
                    <div className='EditBox'>
                        <EditPopup room={selectedRoom} closePopup={closePopup} onDelete={(roomId: number) => {
                            console.log(`Room with ID ${roomId} has been deleted.`);
                            setRooms(rooms.filter(room => room.ID !== roomId));
                            closePopup();
                        }} />
                    </div>
                </div>
            )}
            {showPopupNew && (
                <div className='EditPOPUP'>
                    <div className='EditBox'>
                        <CreatePopup closePopup={closePopupNew} /> {/* Create new room */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Meeting_Room;
