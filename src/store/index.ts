import { configureStore } from '@reduxjs/toolkit';

import { createAPI, setUnauthorizedHandler } from '@/services/api';
import { AuthorizationStatus } from '@/const';
import { requireAuthorization } from './action';
import { reducer } from './reducer';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

setUnauthorizedHandler(api, () => {
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
