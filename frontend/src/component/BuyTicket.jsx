import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../data/api";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe

const BuyTicket = () => {
    const userId = useSelector((state) => state.auth.userId);
    console.log('User ID for payment:', userId);
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [selectedTicketType, setSelectedTicketType] = useState('');
    const [onwardPrice, setOnwardPrice] = useState(0); // Store onward price
    const [finalPrice, setFinalPrice] = useState(0); // Store final calculated price
    
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await api.get(`/api/events/events/${eventId}`);
                setEvent(response.data);
                setOnwardPrice(response.data.ticketPricing);
                console.log(onwardPrice); // Set onward price from event details
                setFinalPrice(response.data.onwardPrice); // Set initial price as onward price
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        console.log(onwardPrice); 
        const fetchTicketTypes = async () => {
            try {
                const response = await api.get('/api/ticket-types');
                setTicketTypes(response.data);
            } catch (error) {
                console.error("Error fetching ticket types:", error);
            }
        };

        fetchEventDetails();
        fetchTicketTypes();
    }, [eventId]);

    const handleTicketTypeChange = (e) => {
        const selected = ticketTypes.find(t => t.name === e.target.value);
        setSelectedTicketType(selected.name);
        setFinalPrice(selected.price);
        setFinalPrice(onwardPrice + selected.price);
    };

    const handlePayment = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }
        console.log("Token being sent:", token); 
        // Step 1: Create ticket in the backend
        api.post('/ticketapi/tickets', {
            eventId,
            purchaserId: userId,
            ticketTypeName: selectedTicketType,
            paymentAmount: finalPrice, // Send final calculated price
            currency: 'INR',
            paymentMethod: 'card',
        }
        // , 
        // {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        )
        .then(response => {
            const ticket = response.data.ticket; // Get the created ticket
            console.log("Ticket created:", ticket);
            
            // Step 2: Now, initiate Stripe checkout session
            const stripePromise = loadStripe('pk_test_51PyGFxHRivblCT2OOt8W9uUMHs4u56ZfDAbK2ZHhFTgRlnLaxFAReUnLhOAK3b40mEJ9A0ulzAMlnTQTwvQ8YTk000oQ8eGDMs');
            
            return stripePromise; // Return the stripe object promise
        })
        .then(async (stripe) => {
            // Step 3: Call the backend to create the Stripe session
            return api.post('/checkout', {
                eventId,
                purchaserId: userId,
                ticketTypeName: selectedTicketType,
                paymentAmount: finalPrice,
            }
            // , {
            //     headers: {
            //         'Authorization': `Bearer ${token}`, 
            //     }
            // }
        )
            .then(response => {
                const sessionId = response.data.sessionId;
                console.log("Stripe session created with ID:", sessionId);

                // Step 4: Redirect to Stripe checkout
                return stripe.redirectToCheckout({ sessionId });
            });
        })
        .then((result) => {
            if (result.error) {
                console.error("Stripe checkout error:", result.error);
                // Handle error during Stripe redirection if needed
            }
        })
        .catch(error => {
            console.error("Error during payment process:", error);
            // Handle error in ticket creation or stripe checkout
        });
    };

    if (!event) {
        return <p className="text-center text-gray-500">Loading event details...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <img
                src={`https://online-event-management-backend.onrender.com/uploads/${event.images[0]}`}
                alt={event.title}
                className="w-full h-64 object-contain rounded-t-lg mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">Buy Ticket for {event.title}</h1>
            <div className="mb-6">
                <label htmlFor="ticketType" className="block text-lg font-medium mb-2">Ticket Type:</label>
                <select
                    id="ticketType"
                    value={selectedTicketType}
                    onChange={handleTicketTypeChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="" disabled selected>Select a ticket type</option>
                    {ticketTypes.map(type => (
                        <option key={type._id} value={type.name}>
                            {type.name} - ₹{type.price}
                        </option>
                    ))}
                </select>
                <h3 className="text-xl font-semibold mt-4">Total Price: ₹{finalPrice}</h3>
            </div>
            <button
                onClick={handlePayment}
                className="w-full bg-red-600 text-white py-3 rounded-md shadow-lg hover:bg-red-700 transition duration-300"
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default BuyTicket;
