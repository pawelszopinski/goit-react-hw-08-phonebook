import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contactsReducer from './phonebookSlice';
import authReducer from './authSlice';

const contactsPersistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contacts'], // Wprowadź nazwę reducera, którego stan chcesz zachować w localStorage
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn', 'token', 'user'], // Wprowadź nazwy pól stanu reducera auth, które chcesz zachować w localStorage
};

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    phonebook: persistedContactsReducer,
    auth: persistedAuthReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
