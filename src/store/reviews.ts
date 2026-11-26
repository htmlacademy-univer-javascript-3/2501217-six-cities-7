import { createReducer } from '@reduxjs/toolkit';

import { RequestStatus } from '@/const';
import type { Offer, Review } from '@/types/offer';
import type { RequestState } from '@/types/request-status';
import { clearOffer } from './action';
import { fetchOfferAction, postReviewAction } from './api-actions';

interface ReviewsState {
  offerId: Offer['id'] | null;
  offerRequestId: string | null;
  comments: Review[];
  submitStatus: RequestState;
  submitError: string | null;
}

const initialState: ReviewsState = {
  offerId: null,
  offerRequestId: null,
  comments: [],
  submitStatus: RequestStatus.Idle,
  submitError: null,
};

export const reviews = createReducer(initialState, (builder) => {
  builder
    .addCase(clearOffer, () => initialState)
    .addCase(fetchOfferAction.pending, (_state, action) => ({
      ...initialState,
      offerRequestId: action.meta.requestId,
    }))
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      if (state.offerRequestId === action.meta.requestId) {
        state.offerId = action.payload.offer.id;
        state.comments = action.payload.comments;
        state.offerRequestId = null;
      }
    })
    .addCase(fetchOfferAction.rejected, (state, action) => {
      if (state.offerRequestId === action.meta.requestId) {
        state.offerRequestId = null;
      }
    })
    .addCase(postReviewAction.pending, (state, action) => {
      if (state.offerId === action.meta.arg.offerId) {
        state.submitStatus = RequestStatus.Loading;
        state.submitError = null;
      }
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      if (state.offerId === action.meta.arg.offerId) {
        state.comments.unshift(action.payload);
        state.submitStatus = RequestStatus.Success;
      }
    })
    .addCase(postReviewAction.rejected, (state, action) => {
      if (state.offerId === action.meta.arg.offerId) {
        state.submitStatus = RequestStatus.Error;
        state.submitError = action.payload ?? 'Could not submit your review. Please try again.';
      }
    });
});
