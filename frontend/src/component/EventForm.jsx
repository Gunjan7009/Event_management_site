import React, { useState } from 'react';
import api from "../data/api";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    city: '',
    ticketPricing: '',
    category: ''
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventData = new FormData();
    for (let key in formData) {
      eventData.append(key, formData[key]);
    }
    // Append each image file to form data
    for (let i = 0; i < images.length; i++) {
      eventData.append('images', images[i]);
    }

    try {
      const response = await api.post('/api/events/events', eventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Event successfully created:', response.data);
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200" style={{width:"100%"}}>
      <div className="p-8 bg-white shadow-md rounded-md mt-8 mb-8" style={{width:"80%"}}>
        <h2 className="text-4xl font-bold mb-6 text-center text-red-600 font-serif tracking-wider">LIST YOUR EVENT</h2>
        <h5 className="font-bold mb-6 text-center text-red-600 tracking-wider">Fill the form below and upload a poster for listing of your events</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xl block font-semibold mb-2">Title</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Date</label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Time</label>
            <input 
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Location</label>
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">City</label>
            <input 
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Ticket Pricing</label>
            <input 
              type="number"
              name="ticketPricing"
              value={formData.ticketPricing}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Category</label>
            <input 
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2">Upload Images</label>
            <input 
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 text-3xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            List Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
