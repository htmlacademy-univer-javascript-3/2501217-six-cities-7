import { offers } from './offers';

export const favorites = offers.filter((offer) => offer.isFavorite);
