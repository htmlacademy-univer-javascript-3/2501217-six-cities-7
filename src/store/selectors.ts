import { createSelector } from '@reduxjs/toolkit';

import { NEARBY_OFFERS_COUNT, RequestStatus } from '@/const';
import type { State } from '@/store';
import type { City, Offer } from '@/types/offer';

export const getCity = (state: State) => state.offers.city;
export const getOffers = (state: State) => state.offers.offers;
export const getIsOffersLoading = (state: State) => state.offers.offersStatus === RequestStatus.Idle || state.offers.offersStatus === RequestStatus.Loading;
export const getHasOffersError = (state: State) => state.offers.offersStatus === RequestStatus.Error;

export const getAuthorizationStatus = (state: State) => state.user.authorizationStatus;
export const getUser = (state: State) => state.user.user;
export const getIsLoginLoading = (state: State) => state.user.loginStatus === RequestStatus.Loading;
export const getIsLogoutLoading = (state: State) => state.user.logoutStatus === RequestStatus.Loading;
export const getAuthError = (state: State) => state.user.error;

export const getOffer = (state: State) => state.offer.offer;
const getNearbyOffers = (state: State) => state.offer.nearbyOffers;
export const getOfferComments = (state: State) => state.reviews.comments;
export const getRequestedOfferId = (state: State) => state.offer.requestedOfferId;
export const getOfferStatus = (state: State) => state.offer.status;
export const getIsReviewSubmitting = (state: State) => state.reviews.submitStatus === RequestStatus.Loading;
export const getReviewError = (state: State) => state.reviews.submitError;

export const getFavoritesStatus = (state: State) => state.favorites.status;
export const getFavoriteUpdateError = (state: State) => state.favorites.updateError;
export const getIsFavoriteUpdating = (state: State, offerId: Offer['id']) => Boolean(state.favorites.pendingById[offerId]);
const getFavoriteOffers = (state: State) => state.favorites.items;

const getFavoriteOfferIds = createSelector(
  [getFavoriteOffers],
  (offers) => new Set(offers.map((offer) => offer.id))
);

export const getIsFavorite = (state: State, offerId: Offer['id']) => getFavoriteOfferIds(state).has(offerId);

export const getFavoriteOfferCount = createSelector(
  [getFavoriteOffers],
  (offers) => offers.length
);

export const getFavoriteOffersByCity = createSelector(
  [getFavoriteOffers],
  (offers) => {
    const offersByCity = new Map<City['name'], Offer[]>();

    for (const offer of offers) {
      const city = offer.city.name;
      const cityOffers = offersByCity.get(city);

      if (cityOffers) {
        cityOffers.push(offer);
      } else {
        offersByCity.set(city, [offer]);
      }
    }

    return Array.from(offersByCity);
  }
);

export const getCityOffers = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const getVisibleNearbyOffers = createSelector(
  [getNearbyOffers],
  (offers) => offers.slice(0, NEARBY_OFFERS_COUNT)
);

export const getOfferMapOffers = createSelector(
  [getVisibleNearbyOffers, getOffer],
  (nearbyOffers, offer) => offer ? [...nearbyOffers, offer] : nearbyOffers
);
