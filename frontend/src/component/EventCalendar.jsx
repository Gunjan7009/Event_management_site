import React, { useState, useEffect } from 'react';
// import Calendar from '@fullcalendar/react';
import FullCalendar from '@fullcalendar/react';
import DateAdapter from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import api from '../data/api'; // Adjust the path according to your project structure
import moment from 'moment';


Modal.setAppElement('#root');
const momentDateAdapter = new DateAdapter({
    dateLibrary: moment,
});


const categoryColors = {
    'Concert': 'blue',
    'Music': 'green',
    'Workshop': 'orange',
    'Comedy': 'red',
};

const getCategoryColor = (category) => {
    return categoryColors[category] || 'black';
};


const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        // Fetch events from API
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events/events');
                setEvents(response.data.map(event => ({
                    id: event._id,
                    title: event.title,
                    start: new Date(event.date),
                    extendedProps: {
                        description: event.description,
                        category: event.category,
                    },
                    backgroundColor: getCategoryColor(event.category),
                })));
            }
            catch (error) {
                console.error('Error fetching events :', error);
            }
        };
        fetchEvents();
    }, []);


    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            description: info.event.extendedProps.description,
            start: info.event.startStr,
        });
        setShowModal(true);
    };


    const handleEventDrop = async (info) => {
        // Handle event rescheduling
        try {
            await api.put(`/events/${info.event.id}`, {
                date: info.event.startStr,
            });
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <>
    <div className="my-6 mx-80 p-4 bg-white shadow-md w-4/5">
        <div className="calendar-container" > {/* Adjust the size */}
          <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events}
                    eventClick={handleEventClick}
                    editable={true}
                    droppable={true}
                    eventDrop={handleEventDrop}
                    localizer={momentDateAdapter}
                />
            </div>
            {selectedEvent && (
                <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex:1000,
                    },
                    content: {
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -20%)',
                        width: '60%',
                        maxWidth: '500px',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#fff',
                        zIndex:2000,
                    },
                }}>
                    <div className="modal-content">
                    <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                    <p className="mt-2">{selectedEvent.description}</p>
                    <p className="mt-2"><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </Modal>
            )}
            </div>
        </>
    );
};

export default EventCalendar;
