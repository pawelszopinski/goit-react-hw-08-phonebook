import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './phonebookSlice';

const store = configureStore({
  reducer: {
    phonebook: contactsReducer,
  },
});

export default store;
