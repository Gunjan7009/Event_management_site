import React from 'react';
// import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, Link } from 'react-router-dom';
const Head = () => {



    return (
        <nav className="bg-red-600 text-white py-3 px-6 flex items-center justify-center h-24">
        {/* Centered Logo */}
        <div className="flex items-center justify-center">
        <Link to="/" className="font-bold text-2xl md:text-3xl">LeisureBookings.in</Link>
        </div>
    </nav>
    );
};

export default Head;
