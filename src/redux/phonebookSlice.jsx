import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://64c2e27feb7fd5d6ebd06acf.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'phonebook/fetchContacts',
  async () => {
    const response = await axios.get(`${apiUrl}/contacts`);
    return response.data;
  }
);

export const addContactToBackend = createAsyncThunk(
  'phonebook/addContactToBackend',
  async contact => {
    const response = await axios.post(`${apiUrl}/contacts`, contact);
    return response.data;
  }
);

export const removeContactFromBackend = createAsyncThunk(
  'phonebook/removeContactFromBackend',
  async contactId => {
    await axios.delete(`${apiUrl}/contacts/${contactId}`);
    return contactId;
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
      localStorage.setItem('phonebookContacts', JSON.stringify(state.contacts));
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      localStorage.setItem('phonebookContacts', JSON.stringify(state.contacts));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    initializeStateFromLocalStorage: state => {
      const localContacts = localStorage.getItem('phonebookContacts');
      if (localContacts) {
        state.contacts = JSON.parse(localContacts);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addContactToBackend.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(removeContactFromBackend.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { addContact, removeContact, setFilter } = phonebookSlice.actions;
export default phonebookSlice.reducer;
