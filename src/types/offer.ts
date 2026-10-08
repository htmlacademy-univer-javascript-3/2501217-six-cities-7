export interface City {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: City['location'];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface Host {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface DetailedOffer extends Offer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export interface Review {
  id: string;
  offerId: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}
