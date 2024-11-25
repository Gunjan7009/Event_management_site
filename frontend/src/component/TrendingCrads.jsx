import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../data/api";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Carousel from "./Carousel";

const TrendingCards = () => {
  const [trendingEvents, setTrendingEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await api.get("/api/events/events");
        setTrendingEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchTrendingEvents();
  }, []);

  const handleBuyNow = (eventId) => {
    navigate(`/buy-ticket/${eventId}`);
  };

  return (
    <section className="my-8 relative px-4 transition-all duration-300 ease-in-out">
      <div className="mb-6 flex items-center">
        <span className="text-red-600">
          <WhatshotIcon style={{ fontSize: 50 }}/>
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-red-600 ml-2">Trending</h2>
      </div>

      <Carousel
        items={trendingEvents}
        renderItem={(event) => (
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border h-full transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="image-container h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200 rounded mb-4 overflow-hidden">
              {event.images && event.images.length > 0 ? (
                <img
                  src={`https://online-event-management-backend.onrender.com/uploads/${event.images[0]}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            <div className="h-1/3 flex flex-col justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate mb-2">{event.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <CalendarMonthIcon className="text-red-600 text-sm sm:text-base" />
                  <p className="ml-2 text-xs sm:text-sm">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <HistoryToggleOffIcon className="text-red-600 text-sm sm:text-base" />
                  <p className="ml-2 text-xs sm:text-sm">{event.time}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <LocationOnIcon className="text-red-600 text-sm sm:text-base" />
                  <p className="ml-2 text-xs sm:text-sm truncate">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-gray-600 text-sm sm:text-base">₹{event.ticketPricing} ONWARDS</span>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm shadow transition-colors duration-300 hover:bg-red-700"
                  onClick={() => handleBuyNow(event._id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
};

export default TrendingCards;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../data/api";
// import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import WhatshotIcon from "@mui/icons-material/Whatshot";
// import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
// import Carousel from "./Carousel";  // Import the Carousel component
// const TrendingCards = () => {
//   const [trendingEvents, setTrendingEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//       const fetchTrendingEvents = async () => {
//           try {
//               const response = await api.get("/api/events/events");
//               setTrendingEvents(response.data);
//           } catch (error) {
//               console.error("Error fetching events:", error);
//           }
//       };
//       fetchTrendingEvents();
//   }, []);

//   const handleBuyNow = (eventId) => {
//       navigate(`/buy-ticket/${eventId}`);
//   };

//   return (
//       <section className="my-8 relative px-4">
//           <div className="mb-6 flex items-center">
//               <span className="text-red-600">
//                   <WhatshotIcon style={{ fontSize: 50 }} />
//               </span>
//               <h2 className="text-4xl font-semibold text-red-600">Trending</h2>
//           </div>

//           {/* Use the Carousel component */}
//           <Carousel
//               items={trendingEvents}
//               renderItem={(event) => (
//                   <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border h-full">
//                       <div className="image-container h-2/3 bg-gray-200 rounded mb-4 overflow-hidden">
//                           {event.images && event.images.length > 0 ? (
//                               <img
//                                   src={`https://online-event-management-backend.onrender.com/uploads/${event.images[0]}`}
//                                   alt={event.title}
//                                   className="w-full h-full object-cover"
//                               />
//                           ) : (
//                               <div className="flex items-center justify-center h-full text-gray-500">
//                                   No Image Available
//                               </div>
//                           )}
//                       </div>

//                       <div className="h-1/3 flex flex-col justify-between">
//                           <h3 className="text-md font-semibold text-gray-800 truncate">{event.title}</h3>
//                           <div className="flex items-center mt-3 text-gray-600">
//                               <CalendarMonthIcon className="text-red-600" />
//                               <p className="ml-2 text-sm">{new Date(event.date).toLocaleDateString()}</p>
//                           </div>
//                           <div className="flex items-center mt-2 text-gray-600">
//                               <HistoryToggleOffIcon className="text-red-600" />
//                               <p className="ml-2 text-sm">{event.time}</p>
//                           </div>
//                           <div className="flex items-center mt-2 text-gray-600">
//                                             <span className="text-red-600"><LocationOnIcon /></span>
//                                             <p className="ml-2 text-sm">{event.location}</p>
//                                         </div>
//                           <div className="flex items-center justify-between mt-4 mb-4">
//                               <span className="font-bold text-gray-600">₹{event.ticketPricing} ONWARDS</span>
//                               <button
//                                   className="bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
//                                   onClick={() => handleBuyNow(event._id)}
//                               >
//                                   Buy Now
//                               </button>
//                           </div>
//                       </div>
//                   </div>
//               )}
//           />
//       </section>
//   );
// };

// export default TrendingCards;

// const TrendingCards = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/api/events/events");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const handleBuyNow = (eventId) => {
//     // Navigate to the ticket purchase page with the event ID
//     navigate(`/buy-ticket/${eventId}`);
// };

//   // Move to the previous slide
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? data.length - 4 : prevIndex - 1
//     );
//   };

//   // Move to the next slide
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === data.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <section id="movie-card" className="my-8 relative px-4">
//       <div className="mb-6 flex items-center">
//         <span className="text-red-600">
//           <WhatshotIcon style={{ fontSize: 50 }} />
//         </span>
//         <h2 className="text-4xl font-semibold text-red-600">Trending</h2>
//       </div>

//       <div>
//         {/* Control Buttons */}
//         <div className="absolute inset-y-0 left-0 flex items-center justify-center z-10">
//           <button
//             onClick={prevSlide}
//             aria-label="Previous Slide"
//             className="text-red-600"
//           >
//             <ArrowLeftIcon fontSize="large" />
//           </button>
//         </div>

//         <div className="absolute inset-y-0 right-0 flex items-center justify-center z-10">
//           <button
//             onClick={nextSlide}
//             aria-label="Next Slide"
//             className="text-red-600"
//           >
//             <ArrowRightIcon fontSize="large" />
//           </button>
//         </div>

        
//         <div className="overflow-hidden w-full">
//           <div
//             className="flex transition-transform duration-500"
//             style={{
//               transform: `translateX(-${
//                 currentIndex * (100 / Math.min(4, data.length))
//               }%)`,
//             }}
//            >
//             {data.length > 0 ? (
//               data.map((event, index) => (
//                 <div key={index} className="flex-shrink-0 w-full lg:w-80 md:w-72 sm:w-72 xs:w-60 px-2">
//                   <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border h-full">
//                     {/* Event Image */}
//                     <div className="image-container h-2/3 bg-gray-200 rounded mb-4 overflow-hidden">
//                       {event.images && event.images.length > 0 ? (
//                         <img
//                           src={`https://online-event-management-backend.onrender.com/uploads/${event.images[0]}`}
//                           alt={event.title}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-gray-500">
//                           No Image Available
//                         </div>
//                       )}
//                     </div>

//                     {/* Event Details */}
//                     <div className="h-1/3 flex flex-col justify-between">
//                       <h3 className="text-md font-semibold truncate">
//                         {event.title}
//                       </h3>
//                       <div className="flex items-center mt-2 text-gray-600">
//                         <span className="text-red-600">
//                           <CalendarMonthIcon />
//                         </span>
//                         <p className="ml-2 text-sm">
//                           {new Date(event.date).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="flex items-center mt-2 text-gray-600">
//                         <span className="text-red-600">
//                           <HistoryToggleOffIcon />
//                         </span>
//                         <p className="ml-2 text-sm"> {event.time}</p>
//                       </div>
//                       <div className="flex items-center mt-2 text-gray-600">
//                         <span className="text-red-600">
//                           <PushPinIcon />
//                         </span>
//                         <p className="ml-2 text-sm">{event.location}</p>
//                       </div>
//                       <div className="flex items-center justify-between mb-4">
//                                   <span className="font-bold text-gray-600">
//                           ₹{event.ticketPricing} ONWARDS
//                         </span>
//                         <button className="bg-red-600 text-white px-3 py-1 rounded text-sm " onClick={() => handleBuyNow(event._id)}>
//                           Buy Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingCards;

