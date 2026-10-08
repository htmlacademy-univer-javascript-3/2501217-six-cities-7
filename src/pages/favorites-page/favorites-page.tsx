import { Link } from 'react-router-dom';

import { OfferList } from '@/components/offer-list/offer-list';
import { Header } from '@/components/header/header';
import { AppRoute } from '@/const';
import type { Offer } from '@/types/offer';

interface FavoritesPageProps {
  offers: Offer[];
}

export const FavoritesPage = ({ offers }: FavoritesPageProps) => {
  const cities = [...new Set(offers.map((offer) => offer.city.name))];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className={`favorites${offers.length === 0 ? ' favorites--empty' : ''}`}>
            <h1 className="favorites__title">
              Saved listing
            </h1>
            {offers.length === 0 ? <p className="favorites__status">Nothing yet saved.</p> : (
              <ul className="favorites__list">
                {cities.map((city) => (
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
                    <OfferList offers={offers.filter((offer) => offer.city.name === city)} className="favorites__places" cardClassName="favorites__card " />
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
