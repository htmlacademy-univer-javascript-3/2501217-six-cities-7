import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { OfferList } from '@/components/offer-list/offer-list';
import { Header } from '@/components/header/header';
import { Spinner } from '@/components/spinner/spinner';
import { AppRoute, RequestStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { fetchFavoritesAction } from '@/store/api-actions';
import { getFavoriteOffersByCity, getFavoritesStatus } from '@/store/selectors';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const offersByCity = useAppSelector(getFavoriteOffersByCity);
  const status = useAppSelector(getFavoritesStatus);
  const isEmpty = offersByCity.length === 0;
  const isLoading = status === RequestStatus.Idle || status === RequestStatus.Loading;
  const hasError = status === RequestStatus.Error;

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const handleFavoritesRetryClick = () => {
    dispatch(fetchFavoritesAction());
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className={`favorites${isEmpty && !isLoading && !hasError ? ' favorites--empty' : ''}`}>
            <h1 className="favorites__title">
              Saved listing
            </h1>
            {hasError && (
              <div role="alert">
                <p>Could not load your bookmarks.</p>
                <button className="button" type="button" onClick={handleFavoritesRetryClick}>Try again</button>
              </div>
            )}
            {isEmpty && isLoading && <Spinner message="Loading bookmarks..." />}
            {isEmpty && !isLoading && !hasError && <p className="favorites__status">Nothing yet saved.</p>}
            {!isEmpty && (
              <ul className="favorites__list">
                {offersByCity.map(([city, offers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>
                            {city}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <OfferList offers={offers} className="favorites__places" cardClassName="favorites__card " />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};
