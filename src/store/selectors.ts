import { createSelector } from '@reduxjs/toolkit';

import { RequestStatus } from '@/const';
import type { State } from '@/store';

export const getCity = (state: State) => state.offers.city;
export const getOffers = (state: State) => state.offers.offers;
export const getIsOffersLoading = (state: State) => state.offers.offersStatus === RequestStatus.Idle || state.offers.offersStatus === RequestStatus.Loading;
export const getHasOffersError = (state: State) => state.offers.offersStatus === RequestStatus.Error;

export const getAuthorizationStatus = (state: State) => state.user.authorizationStatus;
export const getUser = (state: State) => state.user.user;
export const getIsLoginLoading = (state: State) => state.user.loginStatus === RequestStatus.Loading;
export const getIsLogoutLoading = (state: State) => state.user.logoutStatus === RequestStatus.Loading;
export const getAuthError = (state: State) => state.user.error;

export const getFavoriteOffers = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getCityOffers = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
