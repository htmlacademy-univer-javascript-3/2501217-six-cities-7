export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Comments: '/comments',
} as const;

export const RequestStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
} as const;

export const OfferRequestStatus = {
  ...RequestStatus,
  NotFound: 'not-found',
} as const;

export const MAP_MAX_ZOOM = 19;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;
export const MAX_REVIEWS_COUNT = 10;
export const MAX_OFFER_IMAGES_COUNT = 6;
export const NEARBY_OFFERS_COUNT = 3;
export const MIN_PASSWORD_LENGTH = 3;
export const REVIEW_RATING_RANGE = { min: 1, max: 5 } as const;
export const RATING_PERCENTAGE_SCALE = 100;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;
