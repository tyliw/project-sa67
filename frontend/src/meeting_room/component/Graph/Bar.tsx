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
import { GetListPeoPlePerMonth } from '../../../dashboard/sevice/https';

interface PeoplePerMonth {
  Month: string;  // Assume it's a short month like "Jan", "Feb"
  Total: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphBar: React.FC = () => {
  const [people, setPeople] = useState<PeoplePerMonth[]>([]);

  const fetchPeopleParMonth = async () => {
    try {
      const res = await GetListPeoPlePerMonth();
      if (res) {
        setPeople(res);
      }
    } catch (error) {
      console.error("Error fetching people per month:", error);
    }
  };

  useEffect(() => {
    fetchPeopleParMonth();
  }, []);

  // Fixed array of month labels (always show all months)
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Create an array of totals with 0 as default if no data exists for that month
  const totals = labels.map(month => {
    const data = people.find(p => p.Month === month);
    return data ? data.Total : 0;  // If there's data for that month, use it; otherwise, 0
  });

  const data = {
    labels: labels,
    datasets: [{
      label: 'Total People Per Month',
      data: totals,  // Total people per month (or 0 if no data)
      backgroundColor: '#007bff',
    }]
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Number of People per Month'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
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
