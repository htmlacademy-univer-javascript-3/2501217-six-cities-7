import { createReducer } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { OfferRequestStatus, RequestStatus } from '@/const';
import type { DetailedOffer, Offer, Review } from '@/types/offer';
import type { RequestState } from '@/types/request-status';
import { clearOffer } from './action';
import { fetchOfferAction, postReviewAction } from './api-actions';

type OfferStatus = typeof OfferRequestStatus[keyof typeof OfferRequestStatus];

interface OfferState {
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  status: OfferStatus;
  requestedOfferId: Offer['id'] | null;
  requestId: string | null;
  reviewStatus: RequestState;
  reviewError: string | null;
}

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: OfferRequestStatus.Idle,
  requestedOfferId: null,
  requestId: null,
  reviewStatus: RequestStatus.Idle,
  reviewError: null,
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
      state.comments = action.payload.comments;
      state.status = OfferRequestStatus.Success;
    })
    .addCase(fetchOfferAction.rejected, (state, action) => {
      if (state.requestId !== action.meta.requestId) {
        return;
      }

      state.status = action.payload === StatusCodes.NOT_FOUND ? OfferRequestStatus.NotFound : OfferRequestStatus.Error;
    })
    .addCase(postReviewAction.pending, (state, action) => {
      if (state.offer?.id === action.meta.arg.offerId) {
        state.reviewStatus = RequestStatus.Loading;
        state.reviewError = null;
      }
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      if (state.offer?.id === action.meta.arg.offerId) {
        state.comments.unshift(action.payload);
        state.reviewStatus = RequestStatus.Success;
      }
    })
    .addCase(postReviewAction.rejected, (state, action) => {
      if (state.offer?.id === action.meta.arg.offerId) {
        state.reviewStatus = RequestStatus.Error;
        state.reviewError = action.payload ?? 'Could not submit your review. Please try again.';
      }
    });
});
