import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Funkcja pomocnicza do pobrania tokenu z pamięci lokalnej
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

// Thunk do obsługi procesu logowania
export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
      return data.token;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error.message;
  }
});

// Thunk do obsługi procesu wylogowywania
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Przesyłamy token w nagłówku Authorization
      },
    });

    if (response.ok) {
      return;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    throw error.message;
  }
});

// Thunk do obsługi procesu rejestracji
export const register = createAsyncThunk('auth/register', async (userData) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      return data.token;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error.message;
  }
});

// Thunk do pobierania informacji o użytkowniku
export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  try {
    console.log('Fetching user info...');
    const response = await fetch('https://connections-api.herokuapp.com/users/current', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log('User info:', data); // Dodaj ten console.log, aby sprawdzić dane użytkownika
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Get user info error:', error); // Dodaj ten console.log w przypadku błędu
    throw error.message;
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!getTokenFromLocalStorage(),
    token: getTokenFromLocalStorage(),
    user: null, // Dodajemy pole "user" do przechowywania informacji o zalogowanym użytkowniku
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer do obsługi sukcesu logowania
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    });

    // Reducer do obsługi sukcesu wylogowywania
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null; // Po wylogowaniu czyścimy również dane użytkownika
      // Czyścimy token z pamięci lokalnej po wylogowaniu
      localStorage.removeItem('token');
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