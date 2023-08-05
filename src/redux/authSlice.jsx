import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, credentials);
    return response.data.token;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post(`${apiUrl}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });
  } catch (error) {
    throw new Error('Logout failed');
  }
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/users/signup`, userData);
    return response.data.token;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      // Token nie istnieje, więc zwracamy null lub inny odpowiedni stan
      return null;
    }
    const response = await axios.get(`${apiUrl}/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!getTokenFromLocalStorage(),
    token: getTokenFromLocalStorage(),
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login error:', action.error.message);
      })
      .addCase(logout.rejected, (state, action) => {
        console.error('Logout error:', action.error.message);
      })
      .addCase(register.rejected, (state, action) => {
        console.error('Register error:', action.error.message);
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        console.error('Get user info error:', action.error.message);
      });
  },
});

export default authSlice.reducer;