import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import AuthSelection from './component/AuthSelection';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import AdminProtectedRoute from './component/AdminProtectedRoute';
import EventAnalytics from './component/EventAnalytics';
import EventForm from './component/EventForm';
import BuyTicket from './component/BuyTicket';
import EventCalendar from './component/EventCalendar';
import MainLayout from './component/MainLayout';
import SimpleLayout from './component/SimpleLayout';
import PrivateRoute from './component/PrivateRoute';
import Cancel from './component/Cancel';
import Success from './component/Success';



function App() {

  return (
    <>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<MainLayout />}>

            <Route path="/eventform" element={
              <PrivateRoute>
                <EventForm />
              </PrivateRoute>
            }
            />
            <Route
              path="/buy-ticket/:eventId"
              element={
                <PrivateRoute>
                  <BuyTicket />
                </PrivateRoute>
              }
            />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/event-analytics" element={<EventAnalytics />} />
            </Route>
            <Route path="/eventschedule" element={<EventCalendar />} />

            {/* Add other routes with MainLayout here */}
          </Route>
          <Route element={<SimpleLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<AuthSelection />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            {/* <Route path="/activation-success" element={<ActivationSuccess />} /> */}
            {/* Add other routes with SimpleLayout here */}
          </Route>
        </Routes>


      </div>
    </>
  )
}

export default App
