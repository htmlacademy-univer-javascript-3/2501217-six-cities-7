import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import { APIRoute } from '@/const';
import type { Offer } from '@/types/offer';
import { isOffer } from '@/utils/is-offer';

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
