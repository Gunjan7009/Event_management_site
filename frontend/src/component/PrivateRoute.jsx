// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// // Assuming you have authentication state in Redux or local state
// const PrivateRoute = ({ children }) => {
// const location = useLocation();
//   const isAuthenticated = useSelector((state) => state.authenticate.isAuthenticated);  // Check if user is authenticated

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';  // Correct import for js-cookie

const PrivateRoute = ({ children }) => {

   
    const location = useLocation();
    const userData = localStorage.getItem('userData');
    console.log('PrivateRoute: User data:', userData);
    if (userData) {
        console.log('PrivateRoute: User is authenticated, rendering children');
        return children;
    } else {
        console.log('PrivateRoute: User is not authenticated, redirecting to login');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;