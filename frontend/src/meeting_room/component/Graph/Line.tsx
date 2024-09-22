import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { GetListPaymentsPerMonth } from '../../../dashboard/sevice/https';

// Register the necessary components, including Filler for filling under the line
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
interface paymentPerMonth {
  PaymentMonth?:string;
  TotalAmount?:number;
}
const LineChart = () => {
  const [paymentPerMonth,setPaymentPerMongh] = useState<paymentPerMonth[]>([])
  const fetchPeopleParMonth = async () => {
    try {
      const res = await GetListPaymentsPerMonth();
      if (res) {
        setPaymentPerMongh(res);
      }
    } catch (error) {
      console.error("Error fetching people per month:", error);
    }
  };

  useEffect(() => {
    fetchPeopleParMonth();
  }, []);
  
  const label =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const totals = label.map(month => {
    const data = paymentPerMonth.find(p => p.PaymentMonth === month);
    return data ? data.TotalAmount : 0;  // If there's data for that month, use it; otherwise, 0
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: 'Balance',
        data: totals,
        fill: 'start', // Fill from the start to the bottom of the graph
        borderColor: 'rgb(82, 196, 26)', // Line color
        backgroundColor: 'rgba(82, 196, 26, 0.3)', // Semi-transparent fill color
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom', // Position of the legend
      },
      filler: {
        propagate: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensures the y-axis starts at zero
      },
    },
  };

  return (
    <div style={{ width: '100%',height:'100%', display: 'flex', justifyContent: 'center' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
