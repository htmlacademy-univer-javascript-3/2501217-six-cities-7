import { createReducer } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '@/const';
import type { City, Offer } from '@/types/offer';
import type { RequestState } from '@/types/request-status';
import { changeCity } from './action';
import { fetchOffersAction } from './api-actions';

interface OffersState {
  city: City['name'];
  offers: Offer[];
  offersStatus: RequestState;
  requestId: string | null;
}

const initialState: OffersState = {
  city: CITIES[0],
  offers: [],
  offersStatus: RequestStatus.Idle,
  requestId: null,
};

export const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state, action) => {
      state.offersStatus = RequestStatus.Loading;
      state.requestId = action.meta.requestId;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) {
        return;
      }

      state.offers = action.payload;
      state.offersStatus = RequestStatus.Success;
      state.requestId = null;
    })
    .addCase(fetchOffersAction.rejected, (state, action) => {
      if (state.requestId === action.meta.requestId) {
        state.offersStatus = RequestStatus.Error;
        state.requestId = null;
      }
    });
});
