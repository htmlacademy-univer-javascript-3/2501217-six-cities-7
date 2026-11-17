import { createAction } from '@reduxjs/toolkit';

import type { City, Offer } from '@/types/offer';

export const changeCity = createAction<City['name']>('offers/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
