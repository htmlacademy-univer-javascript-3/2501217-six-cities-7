import { createSelector } from '@reduxjs/toolkit';

import { RequestStatus } from '@/const';
import type { State } from '@/store';

export const getCity = (state: State) => state.city;
export const getOffers = (state: State) => state.offers;
export const getIsOffersLoading = (state: State) => state.offersStatus === RequestStatus.Loading;
export const getHasOffersError = (state: State) => state.offersStatus === RequestStatus.Error;

export const getFavoriteOffers = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getCityOffers = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
