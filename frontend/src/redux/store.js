import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './genreSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authReducer,
    // Add other reducers here
  },
});

export default store;