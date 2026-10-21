export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const AMSTERDAM_CITY_LOCATION = {
  latitude: 52.37403,
  longitude: 4.88969,
  zoom: 12,
} as const;

export const MAP_MAX_ZOOM = 19;
export const MIN_REVIEW_LENGTH = 50;
export const REVIEW_RATING_RANGE = { min: 1, max: 5 } as const;
export const RATING_PERCENTAGE_SCALE = 100;
