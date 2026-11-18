import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks/use-store';
import { getAuthorizationStatus, getFavoriteOffers } from '@/store/selectors';
import { FavoritesPage } from '@/pages/favorites-page/favorites-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { MainPage } from '@/pages/main-page/main-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { OfferPage } from '@/pages/offer-page/offer-page';
import { PrivateRoute } from '@/components/private-route/private-route';
import { Spinner } from '@/components/spinner/spinner';

export const App = () => {
  const favorites = useAppSelector(getFavoriteOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner message="Checking authorization..." />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={(
            <PrivateRoute>
              <FavoritesPage offers={favorites} />
            </PrivateRoute>
          )}
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
