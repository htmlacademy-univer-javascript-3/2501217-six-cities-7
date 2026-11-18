import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import type { DetailedOffer, Review } from '@/types/offer';
import { useAppSelector } from '@/hooks/use-store';
import { getFavoriteOffers, getOffers } from '@/store/selectors';
import { FavoritesPage } from '@/pages/favorites-page/favorites-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { MainPage } from '@/pages/main-page/main-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { OfferPage } from '@/pages/offer-page/offer-page';
import { PrivateRoute } from '@/components/private-route/private-route';

interface AppProps {
  detailedOffers: DetailedOffer[];
  comments: Review[];
}

export const App = ({ detailedOffers, comments }: AppProps) => {
  const favorites = useAppSelector(getFavoriteOffers);
  const nearbyOffers = useAppSelector(getOffers);

  return (
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
};
