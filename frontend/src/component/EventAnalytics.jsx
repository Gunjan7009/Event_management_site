import React, { useState, useEffect } from 'react';
import api from "../data/api"
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/api/events/analytics', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        console.log("Analytics data:", response.data); // Check if data is received
        setAnalytics(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics:", err); // Check the actual error
        if (err.response && err.response.status === 403) {
          setError('Access denied: Admins only');
        } else {
          setError('Failed to fetch analytics');
        }
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const eventNames = analytics.map((event) => event.title);
  const ticketStatus = analytics.map((event) =>event.paymentstatus);
  const ticketSales = analytics.map((event) => event.ticketSales);
  const attendance = analytics.map((event) => event.attendance);

  const chartData = {
    labels: eventNames,
    datasets: [
      {
        label: 'Ticket Sales',
        data: ticketSales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Attendance',
        data: attendance,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Ticket Successful Payment Status',
        data: ticketStatus,
        backgroundColor: 'rgba(0,0,0, 0.6)',
      },
    ],
  };

  return (
    <div>
 <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl">Events Analytics</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Event Performance',
            },
          },
          scales:{
            y:{
              beginAtZero: true,
              title: {
                display:true,
                text:'Count/Amount',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default EventAnalytics;
