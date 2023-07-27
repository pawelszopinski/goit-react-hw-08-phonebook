import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, {
  initializeStateFromLocalStorage,
} from './phonebookSlice';

const store = configureStore({
  reducer: {
    phonebook: contactsReducer,
  },
});

store.dispatch(initializeStateFromLocalStorage());
export default store;
