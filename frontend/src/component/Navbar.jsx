import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setToken } from '../redux/authSlice'; // Import the Redux actions
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector(state => state.auth); // Access role from Redux state
    const [isMenuOpen, setIsMenuOpen] = useState(false);


      // Check local storage or cookies on initial load to sync Redux state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        dispatch(setToken(token)); // Set the token in Redux if found
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const handleAnalytics = () => {
    navigate('/event-analytics');
    setIsMenuOpen(false);
};

    const handleClick = () => {
        navigate('/eventschedule');
        setIsMenuOpen(false);
    }

    const handleEvent = () => {
        navigate('/eventform');
        setIsMenuOpen(false);
    }

    const handleauth = () => {
        if (isAuthenticated) {
            localStorage.removeItem('token');
            dispatch(logout());
            navigate('/');
        } else {
            navigate('/auth');
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-red-600 text-white py-4 px-4 md:py-3 md:px-6">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-bold text-2xl md:text-3xl">LeisureBookings.in</Link>

                {/* Hamburger menu for mobile */}
                <button 
                    className="lg:hidden md:flex sm:flex focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop menu */}
                <div className="lg:flex md:hidden sm:hidden hidden items-center space-x-4">
                    <NavButton onClick={handleClick}>Event Schedules</NavButton>
                    <NavButton onClick={handleEvent}>Add your event</NavButton>
                    {isAuthenticated && role === 'admin' && (
                        <NavButton onClick={handleAnalytics}>Event Analytics</NavButton>
                    )}
                    <NavButton onClick={handleauth}>
                        {isAuthenticated ? 'Logout' : 'Login/Register'}
                    </NavButton>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="mt-4 md:flex flex-col">
                    <NavButton className="block w-full mb-2" onClick={handleClick}>Event Schedules</NavButton>
                    <NavButton className="block w-full mb-2" onClick={handleEvent}>Add your event</NavButton>
                    {isAuthenticated && role === 'admin' && (
                        <NavButton className="block w-full mb-2" onClick={handleAnalytics}>Event Analytics</NavButton>
                    )}

                    <NavButton className="block w-full mb-2" onClick={handleauth}>
                        {isAuthenticated ? 'Logout' : 'Login/Register'}
                    </NavButton>
                </div>
            )}
        </nav>
    );
};

// Reusable NavButton component
const NavButton = ({ children, className = "", ...props }) => (
    <button 
        className={`text-lg px-4 py-2 border border-white rounded-full bg-transparent hover:bg-white hover:text-red-600 transition ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Navbar;