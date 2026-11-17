import { configureStore } from '@reduxjs/toolkit';

import { offers } from './reducer';

export const store = configureStore({
  reducer: offers,
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
