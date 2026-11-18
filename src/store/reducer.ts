import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '@/const';
import type { City, Offer } from '@/types/offer';
import type { RequestState } from '@/types/request-status';
import { changeCity } from './action';
import { fetchOffersAction } from './api-actions';
import { user } from './user';

interface OffersState {
  city: City['name'];
  offers: Offer[];
  offersStatus: RequestState;
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

export const reducer = combineReducers({
  offers,
  user,
});
