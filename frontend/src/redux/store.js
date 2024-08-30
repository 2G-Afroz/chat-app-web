import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import chatReducer from './user/chatSlice';
import messageReducer from './user/messageSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
};

const rootReducer = combineReducers({ user: userReducer, chat: chatReducer, message: messageReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
				serializableCheck: false,
			}),
});

export const persistor = persistStore(store);

export default store;