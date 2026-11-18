import { createReducer } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '@/const';
import type { City, Offer } from '@/types/offer';
import { changeCity } from './action';
import { fetchOffersAction } from './api-actions';

interface OffersState {
  city: City['name'];
  offers: Offer[];
  offersStatus: typeof RequestStatus[keyof typeof RequestStatus];
}

const initialState: OffersState = {
  city: CITIES[0],
  offers: [],
  offersStatus: RequestStatus.Idle,
};

export const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersStatus = RequestStatus.Loading;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersStatus = RequestStatus.Success;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersStatus = RequestStatus.Error;
    });
});
