import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { APIRoute } from '@/const';
import { dropToken, saveToken } from '@/services/token';
import type { AuthData, UserData } from '@/types/auth';
import type { DetailedOffer, Offer, OfferPageData, Review, ReviewData } from '@/types/offer';
import { isAuthInfo } from '@/utils/is-auth-info';
import { isOffer } from '@/utils/is-offer';

interface ThunkConfig {
  extra: AxiosInstance;
  rejectValue: string;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<unknown>(APIRoute.Offers);

    if (!Array.isArray(data) || !data.every(isOffer)) {
      throw new Error('Invalid offers response');
    }

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<unknown>(APIRoute.Login);

    if (!isAuthInfo(data)) {
      throw new Error('Invalid authorization response');
    }

    const { token, ...user } = data;
    saveToken(token);

    return user;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkConfig>(
  'user/login',
  async (authData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<unknown>(APIRoute.Login, authData);

      if (!isAuthInfo(data)) {
        throw new Error('Invalid authorization response');
      }

      const { token, ...user } = data;
      saveToken(token);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.BAD_REQUEST) {
        return rejectWithValue('Please enter a valid email and a password with at least one letter and one number.');
      }

      return rejectWithValue('Could not sign in. Please try again.');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(APIRoute.Logout);
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== StatusCodes.UNAUTHORIZED) {
        return rejectWithValue('Could not sign out. Please try again.');
      }
    }

    dropToken();
  }
);

export const fetchOfferAction = createAsyncThunk<OfferPageData, Offer['id'], { extra: AxiosInstance; rejectValue: number }>(
  'offer/fetchOffer',
  async (offerId, { extra: api, rejectWithValue, signal }) => {
    try {
      const offerPath = `${APIRoute.Offers}/${offerId}`;
      const { data: offer } = await api.get<DetailedOffer>(offerPath, { signal });
      const [nearbyOffersResult, commentsResult] = await Promise.allSettled([
        api.get<Offer[]>(`${offerPath}/nearby`, { signal }),
        api.get<Review[]>(`${APIRoute.Comments}/${offerId}`, { signal }),
      ]);

      return {
        offer,
        nearbyOffers: nearbyOffersResult.status === 'fulfilled' ? nearbyOffersResult.value.data : [],
        comments: commentsResult.status === 'fulfilled' ? commentsResult.value.data : [],
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        return rejectWithValue(StatusCodes.NOT_FOUND);
      }

      throw error;
    }
  }
);

export const postReviewAction = createAsyncThunk<Review, ReviewData, ThunkConfig>(
  'offer/postReview',
  async ({ offerId, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });

      return data;
    } catch {
      return rejectWithValue('Could not submit your review. Please try again.');
    }
  }
);
