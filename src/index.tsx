import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store';
import { fillOffers } from '@/store/action';

import { comments } from '@/mocks/comments';
import { detailedOffers } from '@/mocks/detailed-offers';
import { favorites } from '@/mocks/favorites';
import { offers } from '@/mocks/offers';
import { nearbyOffers } from '@/mocks/nearby-offers';
import { App } from './components/app/app';
import './components/map/map.css';
import 'leaflet/dist/leaflet.css';

store.dispatch(fillOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favorites={favorites} detailedOffers={detailedOffers} comments={comments} nearbyOffers={nearbyOffers} />
    </Provider>
  </React.StrictMode>
);
