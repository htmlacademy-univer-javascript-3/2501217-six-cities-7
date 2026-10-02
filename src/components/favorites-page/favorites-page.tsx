import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Header } from '../header/header';
const favorites = [
  { id: 'favorite-1', image: '/img/apartment-small-03.jpg', title: 'Nice, cozy, warm big bed apartment', price: 180, type: 'Apartment' },
  { id: 'favorite-2', image: '/img/room-small.jpg', title: 'Wood and stone place', price: 80, type: 'Room' },
];

export const FavoritesPage = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">
            Saved listing
          </h1>
          <ul className="favorites__list">
            {favorites.map((favorite) => (
              <li className="favorites__locations-items" key={favorite.id}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>
                        Amsterdam
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={AppRoute.Offer.replace(':id', favorite.id)}>
                        <img className="place-card__image" src={favorite.image} width="150" height="110" alt="Place image" />
                      </Link>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">
                            &euro;{favorite.price}
                          </b>
                          <span className="place-card__price-text">
                            /&nbsp;night
                          </span>
                        </div>
                        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">
                            In bookmarks
                          </span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '80%' }} />
                          <span className="visually-hidden">
                            Rating
                          </span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={AppRoute.Offer.replace(':id', favorite.id)}>
                          {favorite.title}
                        </Link>
                      </h2>
                      <p className="place-card__type">
                        {favorite.type}
                      </p>
                    </div>
                  </article>
                </div>
              </li>
            ))}
          </ul>
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
