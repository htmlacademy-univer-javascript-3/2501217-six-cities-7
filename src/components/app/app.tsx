import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction } from '@/store/api-actions';
import { getAuthorizationStatus } from '@/store/selectors';
import { FavoritesPage } from '@/pages/favorites-page/favorites-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { MainPage } from '@/pages/main-page/main-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { OfferPage } from '@/pages/offer-page/offer-page';
import { PrivateRoute } from '@/components/private-route/private-route';
import { Spinner } from '@/components/spinner/spinner';

export const App = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasStartedAuthCheck = useRef(false);

  useEffect(() => {
    if (!hasStartedAuthCheck.current) {
      hasStartedAuthCheck.current = true;
      dispatch(checkAuthAction());
    }
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Unknown) {
      dispatch(fetchOffersAction());
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

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
              <FavoritesPage />
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
