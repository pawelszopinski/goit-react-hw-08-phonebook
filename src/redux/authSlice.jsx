import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Thunk do obsługi procesu logowania
export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post('/users/login', credentials);
    setAuthHeader(response.data.token); // Ustawienie nagłówka z tokenem po zalogowaniu
    return response.data.token;
  } catch (error) {
    throw error.message;
  }
});

// Thunk do obsługi procesu wylogowywania
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader(); // Usunięcie nagłówka z tokenem po wylogowaniu
  } catch (error) {
    throw error.message;
  }
});

// Thunk do obsługi procesu rejestracji
export const register = createAsyncThunk('auth/register', async (userData) => {
  try {
    const response = await axios.post('/users/signup', userData);
    setAuthHeader(response.data.token); // Ustawienie nagłówka z tokenem po rejestracji
    return response.data.token;
  } catch (error) {
    throw error.message;
  }
});

// Thunk do pobierania informacji o użytkowniku
export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    throw error.message;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'), // Sprawdzenie, czy token znajduje się w pamięci lokalnej
    token: localStorage.getItem('token'),
    user: null, // Dodajemy pole "user" do przechowywania informacji o zalogowanym użytkowniku
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer do obsługi sukcesu logowania
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Zapisanie tokenu w pamięci lokalnej po zalogowaniu
    });

    // Reducer do obsługi sukcesu wylogowywania
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null; // Po wylogowaniu czyścimy również dane użytkownika
      localStorage.removeItem('token'); // Usunięcie tokenu z pamięci lokalnej po wylogowaniu
    });

    // Reducer do obsługi sukcesu rejestracji
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    });

    // Reducer do obsługi sukcesu pobrania informacji o użytkowniku
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload; // Aktualizujemy dane użytkownika w stanie
    });

    // Reducer do obsługi błędów logowania, rejestracji i wylogowywania
    builder.addCase(login.rejected, (state, action) => {
      console.error('Login error:', action.error.message);
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.error('Logout error:', action.error.message);
    });
    builder.addCase(register.rejected, (state, action) => {
      console.error('Register error:', action.error.message);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      console.error('Get user info error:', action.error.message);
    });
  },
});

export default authSlice.reducer;