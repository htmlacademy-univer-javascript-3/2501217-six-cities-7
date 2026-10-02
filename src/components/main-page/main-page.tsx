import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Header } from '../header/header';
import { PlaceCard } from '../place-card/place-card';

interface MainPageProps {
  offerCount: number;
}

const offers = [
  { id: 'apartment-01', image: '/img/apartment-01.jpg', price: 120, title: 'Beautiful & luxurious apartment at great location', type: 'Apartment', isPremium: true },
  { id: 'room-01', image: '/img/room.jpg', price: 80, title: 'Wood and stone place', type: 'Room', isFavorite: true },
  { id: 'apartment-02', image: '/img/apartment-02.jpg', price: 132, title: 'Canal View Prinsengracht', type: 'Apartment' },
  { id: 'apartment-03', image: '/img/apartment-03.jpg', price: 180, title: 'Nice, cozy, warm big bed apartment', type: 'Apartment', isPremium: true, ratingWidth: '100%' },
  { id: 'room-02', image: '/img/room.jpg', price: 80, title: 'Wood and stone place', type: 'Room', isFavorite: true },
];

export const MainPage = ({ offerCount }: MainPageProps) => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">
        Cities
      </h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].map((city) => (
              <li className="locations__item" key={city}>
                <Link className={`locations__item-link tabs__item${city === 'Amsterdam' ? ' tabs__item--active' : ''}`} to={AppRoute.Main}>
                  <span>
                    {city}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">
              Places
            </h2>
            <b className="places__found">
              {offerCount} places to stay in Amsterdam
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">
                Sort by
              </span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {offers.map((offer) => <PlaceCard key={offer.id} {...offer} />)}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </main>
  </div>
);
