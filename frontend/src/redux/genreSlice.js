import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../data/api';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/events/events'); // Adjust this endpoint as needed
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});


// Selector to get all events
export const selectAllEvents = (state) => state.events.events;


export const selectGenres = (state) => {
    console.log("Current state:", state); 
    if (!state.events || !state.events.events || state.events.events.length === 0) {
        return [];
      }
      const genreCounts = state.events.events.reduce((acc, event) => {
        if (event && event.category) {
          acc[event.category] = (acc[event.category] || 0) + 1;
        }
        return acc;
      }, {});

  return Object.entries(genreCounts).map(([name, eventsCount]) => ({ name, eventsCount }));
};
// export { fetchEvents }; 
export default eventSlice.reducer;
