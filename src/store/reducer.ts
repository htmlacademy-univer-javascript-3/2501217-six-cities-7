import { combineReducers } from '@reduxjs/toolkit';

import { favorites } from './favorites';
import { offer } from './offer';
import { offers } from './offers';
import { reviews } from './reviews';
import { user } from './user';

export const reducer = combineReducers({
  offers,
  user,
  offer,
  reviews,
  favorites,
});
