import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { FavoritesPage } from '../favorites-page/favorites-page';
import { LoginPage } from '../login-page/login-page';
import { MainPage } from '../main-page/main-page';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { OfferPage } from '../offer-page/offer-page';
import { PrivateRoute } from '../private-route/private-route';

interface AppProps {
  offerCount: number;
}

export const App = ({ offerCount }: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage offerCount={offerCount} />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={(
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        )}
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
