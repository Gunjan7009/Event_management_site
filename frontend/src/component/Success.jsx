import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To get query par
import api from "../data/api";

const Success = () => {
  const location = useLocation();
const [ticketId, setTicketId] = useState(null);
const [paymentStatus, setPaymentStatus] = useState('pending');


  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id'); // Get session_id from URL
  
  useEffect(() => {
    const fetchTicketId = async () => {
      try {
        // Get the ticketId using the sessionId from the backend
        const response = await api.get(`/ticketapi/tickets/session/${sessionId}`);
        console.log('Ticket response:', response.data); // C
        const { ticketId } = response.data;
        setTicketId(ticketId);
      } catch (error) {
        console.error('Error fetching ticket ID:', error);
      }
    };

    if (sessionId) {
      fetchTicketId(); // Fetch ticketId if session_id is available
    }
  }, [sessionId]);

  useEffect(() => {
    const confirmPayment = async () => {
      if (ticketId && sessionId) {
        try {
          // Call your backend API to confirm the payment
          const response = await api.post(`/ticketapi/tickets/${ticketId}/confirmPayment?session_id=${sessionId}`);
          console.log('Payment confirmation:', response.data);
          setPaymentStatus('paid');
        } catch (error) {
          console.error('Error confirming payment:', error);
          setPaymentStatus('failed');
        }
      }
    };

    if (ticketId && sessionId) {
      confirmPayment(); // Trigger the confirmation after successful redirect
    }
  }, [ticketId, sessionId]);

  
  return (
    <div className="text-center">
    {paymentStatus === 'paid' ? (
        <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl">Your payment was successful!</h2>
      ) : paymentStatus === 'failed' ? (
        <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl">Payment confirmation failed. Please contact support.</h2>
      ) : (
        <h2 className="font-bold mb-6 text-center text-slate-700 drop-shadow-md mt-4 xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl">Processing payment confirmation...</h2>
      )}
  </div>
  )
}

export default Success
