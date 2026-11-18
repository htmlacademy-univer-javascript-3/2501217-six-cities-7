import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store';
import { checkAuthAction, fetchOffersAction } from '@/store/api-actions';

import { comments } from '@/mocks/comments';
import { detailedOffers } from '@/mocks/detailed-offers';
import { App } from './components/app/app';
import './components/map/map.css';
import 'leaflet/dist/leaflet.css';

store.dispatch(checkAuthAction()).then(() => store.dispatch(fetchOffersAction()));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App detailedOffers={detailedOffers} comments={comments} />
    </Provider>
  </React.StrictMode>
);
