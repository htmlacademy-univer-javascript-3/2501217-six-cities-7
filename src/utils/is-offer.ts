import type { City, Offer } from '@/types/offer';

const isLocation = (value: unknown): value is City['location'] => (
  typeof value === 'object' && value !== null &&
  'latitude' in value && typeof value.latitude === 'number' && Number.isFinite(value.latitude) &&
  'longitude' in value && typeof value.longitude === 'number' && Number.isFinite(value.longitude) &&
  'zoom' in value && typeof value.zoom === 'number' && Number.isFinite(value.zoom)
);

const isCity = (value: unknown): value is City => (
  typeof value === 'object' && value !== null &&
  'name' in value && typeof value.name === 'string' &&
  'location' in value && isLocation(value.location)
);

export const isOffer = (value: unknown): value is Offer => (
  typeof value === 'object' && value !== null &&
  'id' in value && typeof value.id === 'string' &&
  'title' in value && typeof value.title === 'string' &&
  'type' in value && typeof value.type === 'string' &&
  'price' in value && typeof value.price === 'number' && Number.isFinite(value.price) &&
  'previewImage' in value && typeof value.previewImage === 'string' &&
  'city' in value && isCity(value.city) &&
  'location' in value && isLocation(value.location) &&
  'isFavorite' in value && typeof value.isFavorite === 'boolean' &&
  'isPremium' in value && typeof value.isPremium === 'boolean' &&
  'rating' in value && typeof value.rating === 'number' && Number.isFinite(value.rating)
);
