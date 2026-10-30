import { SortType } from '@/const';
import type { Offer } from '@/types/offer';
import type { Sorting } from '@/types/sorting';

export const sortOffers = (offers: Offer[], sorting: Sorting): Offer[] => {
  switch (sorting) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((first, second) => first.price - second.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((first, second) => second.price - first.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((first, second) => second.rating - first.rating);
    default:
      return offers;
  }
};
