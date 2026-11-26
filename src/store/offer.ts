import { createReducer } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { OfferRequestStatus } from '@/const';
import type { DetailedOffer, Offer } from '@/types/offer';
import { clearOffer } from './action';
import { fetchOfferAction } from './api-actions';

type OfferStatus = typeof OfferRequestStatus[keyof typeof OfferRequestStatus];

interface OfferState {
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  status: OfferStatus;
  requestedOfferId: Offer['id'] | null;
  requestId: string | null;
}

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  status: OfferRequestStatus.Idle,
  requestedOfferId: null,
  requestId: null,
};

export const offer = createReducer(initialState, (builder) => {
  builder
    .addCase(clearOffer, () => initialState)
    .addCase(fetchOfferAction.pending, (_state, action) => ({
      ...initialState,
      status: OfferRequestStatus.Loading,
      requestedOfferId: action.meta.arg,
      requestId: action.meta.requestId,
    }))
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) {
        return;
      }

      state.offer = action.payload.offer;
      state.nearbyOffers = action.payload.nearbyOffers;
      state.status = OfferRequestStatus.Success;
    })
    .addCase(fetchOfferAction.rejected, (state, action) => {
      if (state.requestId !== action.meta.requestId) {
        return;
      }

      state.status = action.payload === StatusCodes.NOT_FOUND ? OfferRequestStatus.NotFound : OfferRequestStatus.Error;
    });
});
