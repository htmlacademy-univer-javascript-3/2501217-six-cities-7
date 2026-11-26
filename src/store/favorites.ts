import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, RequestStatus } from '@/const';
import type { Offer } from '@/types/offer';
import type { RequestState } from '@/types/request-status';
import { requireAuthorization } from './action';
import { checkAuthAction, fetchFavoritesAction, loginAction, logoutAction, updateFavoriteAction } from './api-actions';

interface FavoritesState {
  items: Offer[];
  status: RequestState;
  requestId: string | null;
  pendingById: Partial<Record<Offer['id'], string>>;
  changesDuringLoad: Record<Offer['id'], Offer>;
  updateError: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: RequestStatus.Idle,
  requestId: null,
  pendingById: {},
  changesDuringLoad: {},
  updateError: null,
};

const applyFavoriteUpdate = (items: Offer[], offer: Offer) => {
  const index = items.findIndex((item) => item.id === offer.id);

  if (offer.isFavorite) {
    if (index === -1) {
      items.push(offer);
    } else {
      items[index] = offer;
    }
  } else if (index !== -1) {
    items.splice(index, 1);
  }
};

export const favorites = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => action.payload === AuthorizationStatus.Auth ? state : initialState)
    .addCase(checkAuthAction.rejected, () => initialState)
    .addCase(loginAction.fulfilled, () => initialState)
    .addCase(logoutAction.fulfilled, () => initialState)
    .addCase(fetchFavoritesAction.pending, (state, action) => {
      state.requestId = action.meta.requestId;
      state.status = RequestStatus.Loading;
    })
    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) {
        return;
      }

      const items = [...action.payload];
      for (const offer of Object.values(state.changesDuringLoad)) {
        applyFavoriteUpdate(items, offer);
      }
      state.items = items;
      state.status = RequestStatus.Success;
      state.requestId = null;
      state.changesDuringLoad = {};
    })
    .addCase(fetchFavoritesAction.rejected, (state, action) => {
      if (state.requestId === action.meta.requestId) {
        state.status = RequestStatus.Error;
        state.requestId = null;
        state.changesDuringLoad = {};
      }
    })
    .addCase(updateFavoriteAction.pending, (state, action) => {
      state.pendingById[action.meta.arg.offerId] = action.meta.requestId;
      state.updateError = null;
    })
    .addCase(updateFavoriteAction.fulfilled, (state, action) => {
      const { offerId } = action.meta.arg;
      if (state.pendingById[offerId] !== action.meta.requestId) {
        return;
      }

      delete state.pendingById[offerId];
      applyFavoriteUpdate(state.items, action.payload);
      if (state.requestId) {
        // Preserve updates confirmed after the list request was sent.
        state.changesDuringLoad[offerId] = action.payload;
      }
    })
    .addCase(updateFavoriteAction.rejected, (state, action) => {
      const { offerId } = action.meta.arg;
      if (state.pendingById[offerId] === action.meta.requestId) {
        delete state.pendingById[offerId];
        state.updateError = action.payload ?? 'Could not update your bookmarks. Please try again.';
      }
    });
});
