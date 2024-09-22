import React, { useEffect, useState } from "react";
import { MeetingInterface } from "../../../interface/IMeetingRoom"; // Adjust the path as necessary
import { Button, Form , Input, DatePicker, TimePicker, message as antdMessage, InputNumber, Select } from 'antd';
const { RangePicker } = TimePicker;
import { useNavigate } from "react-router-dom";
import { CreateCustomer, GetCustomer } from "../../../service/https/indexCustomer";
import { CreateBooking, GetBooking, GetBookingMeetingRoomById } from "../../../service/https/indexBooking";
import { CustomerInterface } from "../../../interface/ICustomer";
import { Duration } from "../../../interface/IDuration";
import { GetDurationByDate,GetDuration } from "../../../service/https/indexDuration";
import CustomerID from "./ID";
import moment,{Moment} from 'moment';
const { Option } = Select;

interface bookingNew {
  room: MeetingInterface; // Room data to edit
  customer: CustomerInterface;
  closePopup?: () => void; // Function to close the popup
  handleDelete?: () => void; // Function to handle delete
}
interface bookingByMeetingRoomID{
  DateTime?:string;
  StartTime?:string;
  EndTime?:string;
}
const Booking: React.FC<bookingNew> = ({ room }) => {
  const [roomID] = useState<number | undefined>(room?.ID);
  const [customer, setCustomer] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [booking, setBooking] = useState<bookingByMeetingRoomID[]>([]);
  const [duration, setDuration] = useState<Duration[]>([]);
  const [durationID , setDurationID] = useState<number | undefined>();
  const [availableDurations, setAvailableDurations] = useState<Duration[]>([]);
  const [dateTime , setDateTime] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedDateM, setSelectedDateM] = useState<string | null>(null);
  
  const handleDateChange = (date: Moment | null) => {
    if (date) {
      const dateFormat = encodeURIComponent(date.format('YYYY-MM-DDTHH:mm:ssZ'));
      setDateTime(dateFormat);
      console.log("===> ",dateFormat);
      setSelectedDateM(dateFormat);
      console.log(duration)
    } else {
      setSelectedDateM(null); 
      
    }
    setSelectedDate(date); 
  };
  

  const handleChange =(value:any)=> {
    setDurationID(value);
    console.log('Selected ID:', value);
  };

  useEffect(()=>{
    const fetchData = async () => {
      const response = await GetCustomer(); 
      const id = response;
      setCustomer(id.length+1);
    };
    fetchData();
  },[]);


  useEffect(() => {
    const fetchDurtion = async () => {
      try {
        const response = await GetDuration();
        setDuration(response)
        console.log("--------> ",duration)
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };
    fetchDurtion();
  }, [selectedDate]);

  useEffect(() => {
    const fetchDurtionDate = async () => {
      try {
        if (dateTime) {
          const response = await GetDurationByDate(dateTime);
          console.log(">>>>>>>>> ",response)
          if (response) {
            setDuration(response);
            setAvailableDurations(response);
          } else {
            console.error("No data received for the selected date.");
          }
        }
      } catch (error) {
        console.error("Error fetching duration by date:", error);
      }
    };
    fetchDurtionDate();
  }, [dateTime]);
  
  
  const onFinish = async (values: any) => {
    const { First_Name, Last_Name, Tel, Email } = values;
    console.log(CustomerID); 
    console.log("Time",booking);
    try {
      const res = await CreateCustomer({ First_Name, Last_Name, Tel, Email });
      console.log("CustomerID after creation:", res); 
      if (res) {
        antdMessage.success(res.message || "Customer created successfully.");
        await onCustomerFinish({ ...values });
      } else {
        antdMessage.error(res.message || "Failed to create customer.");
      }
    } catch (error) {
      antdMessage.error("An unexpected error occurred.");
      console.error("CreateCustomer error:", error);
    }
  };
  
  const onCustomerFinish = async (values: any) => {
    const { TotalPeople, DateTime} = values;
  
    try {
      const Date = DateTime?.format('YYYY-MM-DDTHH:mm:ssZ');
      const bookingData = {
        DateTime: Date,
        DurationID: durationID,
        TotalPeople,
        CustomerID:customer, 
        MeetingRoomID: roomID,
      };
  
      console.log("Booking Data:", bookingData);
  
      const res = await CreateBooking(bookingData);
  
      if (res) {
        antdMessage.success(res.message || "Booking created successfully.");
        setTimeout(() => navigate("/login/booking-meeting-rooms"), 2000);
        
      } else {
        antdMessage.error(res.message || "Failed to create booking.");
      }
    } catch (error) {
      antdMessage.error("An unexpected error occurred. Please try again.");
      console.error("CreateBooking error:", error);
    }
  };

  return (
    <div style={{height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    }}>
      <div style={{
        width:'300px',
        height:"50px",
        display:'flex',
        justifyContent:'end',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:'20px',
        }}>
        <h2 style={{borderBottom:'1px solid black'}}>{room.RoomName}</h2>
      </div>
      <Form
        name="booking-meeting-rooms"
        onFinish={onFinish}
        initialValues={{
          RoomName: room.RoomName,
        }}
        labelCol={{ span: 7 }} 
        wrapperCol={{ span: 24 }}
        style={{
          maxWidth:'600px',
          borderRadius:'0px',
          boxShadow:'none'
        }}
      >
      
        {/* <Form.Item
          name="RoomName"
          label="Room Name"
          rules={[{ required: true, message: 'Room Name is required' }]}
          style={{width:'350px',marginBottom:'12px' }}
        >
          <Input placeholder="Room Name" disabled 
            style={{width:'100%'}}  
          />
        </Form.Item> */}

        <Form.Item
          name="First_Name"
          label="First Name"
          style={{ width:'350px',marginBottom:'12px'}}
          rules={[{ required: true, message: 'First Name is required' }]}
        >
          <Input placeholder="First Name" 
          style={{width:'100%',margin:'0px'}} 
          />
        </Form.Item>

        <Form.Item
          name="Last_Name"
          label="Last Name"
          style={{ width:'350px',marginBottom:'12px'}}
          rules={[{ required: true, message: 'Last Name is required' }]}
        >
          <Input 
          placeholder="Last Name" 
          style={{width:'100%',margin:'0px'}} 
          />
        </Form.Item>

        <Form.Item
          name="Tel"
          label="Phone"
          style={{ width:'350px',marginBottom:'12px'}}
          rules={[
            { required: true, message: 'Phone number is required' },
            { len: 10, message: 'Phone number must be exactly 10 digits' },
            { pattern: /^[0-9]*$/, message: 'Phone number must be numeric' }
          ]}
        >
          <Input placeholder="Phone Number" maxLength={10} 
         style={{width:'100%',margin:'0px'}}  
          />
        </Form.Item>

        <Form.Item
          name="Email"
          label="Email"
          style={{ width:'350px',marginBottom:'12px'}}
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input 
          placeholder="Email" 
          type="email"
          style={{width:'100%',margin:'0px'}} 
          />
        </Form.Item>

        <Form.Item
          name="TotalPeople"
          label="Total People"
          style={{ width:'350px',marginBottom:'12px'}}
          rules={[{ required: true, message: 'Total People is required' }]}
        >
          <InputNumber min={1} max={room.Capacity} placeholder={`Capacity: ${room.Capacity}`}
           style={{width:'100%',margin:'0px'}} 
            />
        </Form.Item>

        <Form.Item label="Date and Time" style={{ width:'350px',marginBottom:'12px'}}>
          <Form.Item
            name="DateTime"
            rules={[{ required: true, message: 'Date is required' }]}
            style={{ display: 'inline-block', width: '120px',}}
          >
            <DatePicker 
              placeholder="Select Date"
              onChange={handleDateChange}
              disabledDate={(current) => {
                return current && current < moment().startOf('day');
              }} 
            />
          </Form.Item>
          <Form.Item 
            name="durtion"
            rules={[{ required: true, message: 'Time is required' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 2px)', marginLeft: '5px'}}
            >
            <Select
                placeholder={`Select number of people (Capacity: ${room.Capacity})`}
                style={{ width: '100%' }}
                onChange={handleChange}
              >
              {availableDurations.length > 0 ? (
                availableDurations.map((duration) => (
                  <Option key={duration.ID} value={duration.ID} >
                    {`${duration.StartTime} - ${duration.EndTime}`}
                  </Option>
                ))
              ) : (
                <Option disabled>No durations available</Option>
              )}
              </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item  style={{ 
          textAlign: 'center',
        }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default Booking;
