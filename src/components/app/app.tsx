import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import type { DetailedOffer, Offer, Review } from '@/types/offer';
import { FavoritesPage } from '@/pages/favorites-page/favorites-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { MainPage } from '@/pages/main-page/main-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { OfferPage } from '@/pages/offer-page/offer-page';
import { PrivateRoute } from '@/components/private-route/private-route';

interface AppProps {
  favorites: Offer[];
  detailedOffers: DetailedOffer[];
  comments: Review[];
  nearbyOffers: Offer[];
}

export const App = ({ favorites, detailedOffers, comments, nearbyOffers }: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={(
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage offers={favorites} />
          </PrivateRoute>
        )}
      />
      <Route path={AppRoute.Offer} element={<OfferPage offers={detailedOffers} comments={comments} nearbyOffers={nearbyOffers} />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
