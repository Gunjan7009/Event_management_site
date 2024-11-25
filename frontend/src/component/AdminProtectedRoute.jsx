// AdminProtectedRoute.js
import React, { useEffect } from 'react';
import { Route, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;


  // Effect to handle navigation if user is not authorized
  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      // Navigate to login if the user is not authenticated or not an admin
      navigate('/login');
    }
  }, [isAuthenticated, userRole, navigate]);

  // If authenticated and role is admin, render the component
  if (isAuthenticated && userRole === 'admin') {
    return <Outlet />;
  }

  // Optionally, you can show a loading spinner or some UI here
  // while checking user status, or during redirect.
  return null;
};

export default AdminProtectedRoute;