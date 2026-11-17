import { useState } from 'react';

import { CityList } from '@/components/city-list/city-list';
import { OfferList } from '@/components/offer-list/offer-list';
import { Header } from '@/components/header/header';
import { CITIES, SortType } from '@/const';
import { Map } from '@/components/map/map';
import { SortingOptions } from '@/components/sorting-options/sorting-options';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { changeCity } from '@/store/action';
import { getCity, getCityOffers } from '@/store/selectors';
import type { City, Offer } from '@/types/offer';
import type { Sorting } from '@/types/sorting';
import { sortOffers } from '@/utils/sort-offers';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getCityOffers);
  const [sorting, setSorting] = useState<Sorting>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);
  const sortedOffers = sortOffers(offers, sorting);
  const isEmpty = offers.length === 0;

  const handleCityChange = (selectedCity: City['name']) => {
    if (selectedCity !== city) {
      dispatch(changeCity(selectedCity));
      setSorting(SortType.Popular);
      setActiveOfferId(null);
    }
  };

  const handleSortingChange = (selectedSorting: Sorting) => {
    setSorting(selectedSorting);
    setActiveOfferId(null);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={CITIES} currentCity={city} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container${isEmpty ? ' cities__places-container--empty' : ''}`}>
            {isEmpty ? (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
                </div>
              </section>
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <SortingOptions key={city} sorting={sorting} onSortingChange={handleSortingChange} />
                <OfferList
                  offers={sortedOffers}
                  className="cities__places-list places__list tabs__content"
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>
            )}
            <div className="cities__right-section">
              {!isEmpty && <Map offers={offers} city={offers[0].city} activeOfferId={activeOfferId} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
