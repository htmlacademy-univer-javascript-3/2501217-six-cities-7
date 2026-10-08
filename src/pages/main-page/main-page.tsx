import { Link } from 'react-router-dom';

import { OfferList } from '@/components/offer-list/offer-list';
import { Header } from '@/components/header/header';
import { AppRoute } from '@/const';
import type { Offer } from '@/types/offer';

interface MainPageProps {
  offers: Offer[];
}

export const MainPage = ({ offers }: MainPageProps) => (
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
                <Link className={`locations__item-link tabs__item${city === 'Paris' ? ' tabs__item--active' : ''}`} to={AppRoute.Main}>
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
              {offers.length} places to stay in Paris
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">
                Sort by
              </span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular<svg className="places__sorting-arrow" width="7" height="4"><use xlinkHref="#icon-arrow-select" /></svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                {['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'].map((item, index) => (
                  <li className={`places__option${index === 0 ? ' places__option--active' : ''}`} tabIndex={0} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </form>
            <OfferList offers={offers} className="cities__places-list places__list tabs__content" />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </main>
  </div>
);
