import React from 'react';
import ReactDOM from 'react-dom/client';

import { comments } from '@/mocks/comments';
import { detailedOffers } from '@/mocks/detailed-offers';
import { favorites } from '@/mocks/favorites';
import { offers } from '@/mocks/offers';
import { nearbyOffers } from '@/mocks/nearby-offers';
import { App } from './components/app/app';
import './components/map/map.css';
import 'leaflet/dist/leaflet.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} favorites={favorites} detailedOffers={detailedOffers} comments={comments} nearbyOffers={nearbyOffers} />
  </React.StrictMode>
);
