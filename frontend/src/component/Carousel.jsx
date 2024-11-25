// Carousel.js
// import React, { useState } from 'react';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// const Carousel = ({ items, renderItem }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const prevSlide = () => {
//         setCurrentIndex(prevIndex => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
//     };

//     const nextSlide = () => {
//         setCurrentIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
//     };

//     return (
//         <div className="relative w-full overflow-hidden">
//             {/* Control Buttons */}
//             <button
//                 onClick={prevSlide}
//                 aria-label="Previous Slide"
//                 className="absolute left-0 z-20 text-red-600 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//                 style={{ zIndex: 30 }}
//             >
//                 <ArrowLeftIcon fontSize="large" />
//             </button>

//             <button
//                 onClick={nextSlide}
//                 aria-label="Next Slide"
//                 className="absolute right-0 z-20 text-red-600 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//                 style={{ zIndex: 30 }}
//             >
//                 <ArrowRightIcon fontSize="large" />
//             </button>

//             {/* Carousel Items */}
//             <div
//                 className="flex transition-transform duration-500"
//                 style={{ transform: `translateX(-${currentIndex * (100 / Math.min(4, items.length))}%)` }}
//             >
//                 {items.map((item, index) => (
//                     <div key={index} className="flex-shrink-0 w-full lg:w-80 md:w-72 sm:w-1/4 px-2">
//                         {renderItem(item)}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Carousel;
import React, { useState, useEffect } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Carousel = ({ items, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) setItemsPerPage(4); // xl
            else if (window.innerWidth >= 1024) setItemsPerPage(3); // lg
            else if (window.innerWidth >= 768) setItemsPerPage(2); // md
            else setItemsPerPage(1); // sm and xs
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? Math.max(items.length - itemsPerPage, 0) : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex >= items.length - itemsPerPage ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full overflow-hidden">
            <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-0 z-20 text-red-600 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow transition-opacity duration-300 hover:opacity-75"
                style={{ zIndex: 30 }}
            >
                <ArrowLeftIcon fontSize="large" />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-0 z-20 text-red-600 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow transition-opacity duration-300 hover:opacity-75"
                style={{ zIndex: 30 }}
            >
                <ArrowRightIcon fontSize="large" />
            </button>

            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
                {items.map((item, index) => (
                    <div key={index} className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 transition-all duration-300 ease-in-out`}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;