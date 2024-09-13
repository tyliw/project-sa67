import React, { StrictMode, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import Login from './authentication/login/login';
import BookingList from './food_service/pages/booking_list/BookingList';
import Structure from './food_service/pages/structure/Structure';
import Edit from './food_service/pages/edit/Edit';
import Create from './food_service/pages/create/Create';
import Home from './employee/Home';
import Payment from './payment/payment';
import Receipt from './payment/receipt/receipt';
import SignUpPages from './authentication/Register/SignUpPages';

const RouterComponent: React.FC = () => {
  const [selectedBookingID, setSelectedBookingID] = useState<number | null>(null);

  const handleBookingSelect = (id: number) => {
    setSelectedBookingID(id);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />, // เส้นทางหลักคือหน้า Login
    },
    {
      path: '/signup',
      element: <SignUpPages />, // เส้นทางหลักคือหน้า Login
    },
    {
      path: '/login',
      element: <App />, // เส้นทางหลังจาก login สำเร็จ
      children: [
        { path: 'dashboard', element: <h2>Dashboard Content</h2> },
        { path: 'room', element: <h2>Room Content</h2> },
        { path: 'meeting-room', element: <h2>Meeting Room Content</h2> },
        {
          path: 'food-service',
          element: <BookingList onBookingSelect={handleBookingSelect} />,
        },
        {
          path: 'food-service/structure/:bookingID',
          element: <Structure bookingID={selectedBookingID} />,
        },
        { path: 'manage-data', element: <Edit /> },
        { path: 'manage-data/create-menu', element: <Create /> },
        { path: 'employee/*', element: <Home /> },
        { path: 'payment', element: <Payment /> },
        { path: 'receipt', element: <Receipt /> },
        { path: 'logout', element: <h2>Logout</h2> },
        { path: '*', element: <h2>404 - Not Found</h2> }, // เส้นทาง 404 สำหรับเส้นทางที่ไม่พบ
      ],
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default RouterComponent;
