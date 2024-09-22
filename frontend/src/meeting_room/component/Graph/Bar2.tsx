import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GetListBookingPerMonth, GetListMeetingRoomPerMonth, GetListOrderPerMonth, GetListPeoPlePerMonth } from '../../../dashboard/sevice/https';

interface bookingPerMonth {
    booking_month: string;  
    booking_year_month: string;
    total_bookings: number;
}

interface orderPerMonth {
    order_month: string;  
    order_year_month: string;
    total_amount: number;
}

interface meetingRoomPerMonth {
    meeting_room_month: string;  
    meeting_room_year_month: string;
    total_meeting_rooms: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphBar: React.FC = () => {
  const [booking, setBooking] = useState<bookingPerMonth[]>([]);
  const [order, setOrder] = useState<orderPerMonth[]>([]);
  const [meetingRoom, setMeetingRoom] = useState<meetingRoomPerMonth[]>([]);

  const fetchBookingPerMonth = async () => {
    try {
      const res = await GetListBookingPerMonth();
      if (res) {
        setBooking(res);
      }
    } catch (error) {
      console.error("Error fetching people per month:", error);
    }
  };

  const fetchOrderPerMonth = async () => {
    try {
      const res = await GetListOrderPerMonth();
      if (res) {
        setOrder(res);
      }
    } catch (error) {
      console.error("Error fetching people per month:", error);
    }
  };

  const fetchMeetingRoomPerMonth = async () => {
    try {
      const res = await GetListMeetingRoomPerMonth();
      if (res) {
        setMeetingRoom(res);
      }
    } catch (error) {
      console.error("Error fetching people per month:", error);
    }
  };

  useEffect(() => {
    fetchBookingPerMonth();
    fetchOrderPerMonth();
    fetchMeetingRoomPerMonth();
  }, []);

  // Fixed array of month labels (always show all months)
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Create an array of totals with 0 as default if no data exists for that month
  const totals = labels.map(month => {
    const data = booking.find(p => p.booking_month === month);
    return data ? data.total_bookings : 0;  // If there's data for that month, use it; otherwise, 0
  });

  const totalOrder = labels.map(month => {
    const data = order.find(p => p.order_month === month);
    return data ? data.total_amount : 0;  // If there's data for that month, use it; otherwise, 0
  });
  const totalMeetingRooms = labels.map(month => {
    const data = meetingRoom.find(p => p.meeting_room_month === month);
    return data ? data.total_meeting_rooms : 0;  // If there's data for that month, use it; otherwise, 0
  });

  const data = {
    labels: labels,
    datasets: [{
      label: 'Booking',
      data: totals,  
      backgroundColor: '#007bff',    
    },
    {
        label: 'Meeting Room ',
        data: totalMeetingRooms,  
        backgroundColor: '#12dfe3',
    },
    {
        label: 'Food',
        data: totalOrder,  
        backgroundColor: '#10d0a2',
    },
    
]
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Number of People Using Service Per Month'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of People Using Service Per Month'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total People'
        }
      }
    }
  };

  return (
    <div style={{ width: '100%',height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraphBar;
