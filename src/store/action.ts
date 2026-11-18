import { createAction } from '@reduxjs/toolkit';

import type { AuthorizationStatus } from '@/const';
import type { City } from '@/types/offer';

export const changeCity = createAction<City['name']>('offers/changeCity');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
