import { createReducer } from '@reduxjs/toolkit';

import { CITIES } from '@/const';
import type { City, Offer } from '@/types/offer';
import { changeCity, fillOffers } from './action';

interface OffersState {
  city: City['name'];
  offers: Offer[];
}

const initialState: OffersState = {
  city: CITIES[0],
  offers: [],
};

export const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});
