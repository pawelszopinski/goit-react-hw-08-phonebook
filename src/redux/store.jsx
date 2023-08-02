import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './phonebookSlice';
import authReducer from './authSlice';
import { getUserInfo } from './authSlice';

const store = configureStore({
  reducer: {
    phonebook: contactsReducer,
    auth: authReducer,
    devTools: true,
  },
});
store.dispatch(getUserInfo());
export default store;
