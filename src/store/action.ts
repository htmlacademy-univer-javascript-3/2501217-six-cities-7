import { createAction } from '@reduxjs/toolkit';

import type { City } from '@/types/offer';

export const changeCity = createAction<City['name']>('offers/changeCity');
