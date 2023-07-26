import { createSlice } from '@reduxjs/toolkit';

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [
      { id: '1', name: 'John Doe', number: '123456789' },
      { id: '2', name: 'James Bond', number: '987654321' },
      { id: '3', name: 'Mike Tyson', number: '456789123' },
    ],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, setFilter } = phonebookSlice.actions;
export default phonebookSlice.reducer;
