import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from './counter/counterSlice';
import todoSlice from './example/exampleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todoSlice: todoSlice,
  },
  middleware: getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
