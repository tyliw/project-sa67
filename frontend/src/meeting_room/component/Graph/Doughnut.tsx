import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { GetListRoomTypePercent } from '../../../dashboard/sevice/https';

ChartJS.register(ArcElement, Tooltip, Legend);

interface roomsTypePercent {
  room_type?: string;
  count?: number;
  percent?: number;
}

const Graph: React.FC = () => {
  const [roomTypePercent, setRoomTypePercent] = useState<roomsTypePercent[]>([]);

  const fetchRoomsTypePercent = async () => {
    try {
      const res = await GetListRoomTypePercent();
      if (res) {
        setRoomTypePercent(res);
      }
    } catch (error) {
      console.error("Error fetching room type percent:", error);
    }
  };

  useEffect(() => {
    fetchRoomsTypePercent();
  }, []);

  const labels = ['Single', 'Double', 'Suite'];

  // Get counts directly for the Doughnut chart
  const data = labels.map(type => {
    const dataPoint = roomTypePercent.find(p => p.room_type === type);
    return dataPoint ? dataPoint.count || 0 : 0; // Return count directly
  });

  const total = data.reduce((sum, count) => sum + count, 0); // Calculate total for percentage

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Room Type',
        data: data,
        backgroundColor: [
          'rgb(31, 120, 180)',
          'rgb(230, 126, 34)',
          'rgb(39, 174, 96)',
        ],
        hoverOffset: 16,
      },
    ],
  };

  // Custom tooltip to display percentage
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percent = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${tooltipItem.label}:${percent}%`;
          },
        },
      },
      title: {
        display: true,
        text: 'Room type'
      }
    },
  };

  return (
    <div style={{ width: '90%',height:'95%', display: 'flex', justifyContent: 'center'}}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Graph;
