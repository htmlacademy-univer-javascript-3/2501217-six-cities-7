import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '@/services/api';
import { offers } from './reducer';

const api = createAPI();

export const store = configureStore({
  reducer: offers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
