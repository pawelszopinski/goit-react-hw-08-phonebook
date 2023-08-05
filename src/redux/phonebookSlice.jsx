import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

// Funkcja pomocnicza do pobrania tokenu z pamięci lokalnej
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const fetchContacts = createAsyncThunk('phonebook/fetchContacts', async () => {
  try {
    const response = await axios.get(`${apiUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addContactToBackend = createAsyncThunk('phonebook/addContactToBackend', async (contact) => {
  const response = await axios.post(`${apiUrl}/contacts`, contact);
  return response.data;
});

export const removeContactFromBackend = createAsyncThunk('phonebook/removeContactFromBackend', async (contactId) => {
  await axios.delete(`${apiUrl}/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  return contactId;
});

export const setFilter = createAsyncThunk('phonebook/setFilter', async (filterValue) => {
  try {
    const response = await axios.get(`${apiUrl}/contacts?filter=${filterValue}`);
    return {
      filter: filterValue,
      filteredContacts: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
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
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      })
      .addCase(setFilter.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setFilter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.filter = action.payload.filter;
        state.contacts = action.payload.filteredContacts;
      })
      .addCase(setFilter.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default phonebookSlice.reducer;
