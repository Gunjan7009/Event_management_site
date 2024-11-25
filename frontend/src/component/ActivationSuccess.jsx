import React from 'react';
import { Link } from 'react-router-dom';
import './ActivationSuccess.css';

const ActivationSuccess = () => {
  return (
    <div className="activation-success-container">
      <h1>Account Activated!</h1>
      <p>Welcome to our service. You can now log in to access your account.</p>
      <Link to="/login" className="login-button">Log in Now</Link>
      <p>Learn more about our features: <Link to="/">About Us</Link></p>
    </div>
  );
};

export default ActivationSuccess;