import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, RequestStatus } from '@/const';
import type { UserData } from '@/types/auth';
import type { RequestState } from '@/types/request-status';
import { requireAuthorization } from './action';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';

interface UserState {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  loginStatus: RequestState;
  logoutStatus: RequestState;
  error: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  loginStatus: RequestStatus.Idle,
  logoutStatus: RequestStatus.Idle,
  error: null,
};

export const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;

      if (action.payload !== AuthorizationStatus.Auth) {
        state.user = null;
      }
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(loginAction.pending, (state) => {
      state.loginStatus = RequestStatus.Loading;
      state.error = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
      state.loginStatus = RequestStatus.Success;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.loginStatus = RequestStatus.Error;
      state.error = action.payload ?? 'Could not sign in. Please try again.';
    })
    .addCase(logoutAction.pending, (state) => {
      state.logoutStatus = RequestStatus.Loading;
      state.error = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
      state.logoutStatus = RequestStatus.Success;
    })
    .addCase(logoutAction.rejected, (state, action) => {
      state.logoutStatus = RequestStatus.Error;
      state.error = action.payload ?? 'Could not sign out. Please try again.';
    });
});
