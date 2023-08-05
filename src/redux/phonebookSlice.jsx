import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk('phonebook/fetchContacts', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get(`${apiUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addContactToBackend = createAsyncThunk('phonebook/addContactToBackend', async (contact, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${apiUrl}/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const removeContactFromBackend = createAsyncThunk('phonebook/removeContactFromBackend', async (contactId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${apiUrl}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return contactId;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const setFilter = createAsyncThunk('phonebook/setFilter', async (filterValue, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get(`${apiUrl}/contacts?filter=${filterValue}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        console.error('Fetch contacts error:', action.error);
      })
      .addCase(addContactToBackend.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(removeContactFromBackend.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      })
      .addCase(setFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setFilter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filter = action.payload.filter;
        state.contacts = action.payload.filteredContacts;
      })
      .addCase(setFilter.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export default phonebookSlice.reducer;