import { useCallback, useMemo, useState } from 'react';

import { CityList } from '@/components/city-list/city-list';
import { EmptyOffers } from '@/components/empty-offers/empty-offers';
import { OfferList } from '@/components/offer-list/offer-list';
import { Header } from '@/components/header/header';
import { CITIES, SortType } from '@/const';
import { Map } from '@/components/map/map';
import { SortingOptions } from '@/components/sorting-options/sorting-options';
import { Spinner } from '@/components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { changeCity } from '@/store/action';
import { fetchOffersAction } from '@/store/api-actions';
import { getCity, getCityOffers, getHasOffersError, getIsOffersLoading } from '@/store/selectors';
import type { City, Offer } from '@/types/offer';
import type { Sorting } from '@/types/sorting';
import { sortOffers } from '@/utils/sort-offers';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getCityOffers);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const hasOffersError = useAppSelector(getHasOffersError);
  const [sorting, setSorting] = useState<Sorting>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);
  const sortedOffers = useMemo(() => sortOffers(offers, sorting), [offers, sorting]);
  const isEmpty = offers.length === 0;

  const handleCityChange = useCallback((selectedCity: City['name']) => {
    if (selectedCity !== city) {
      dispatch(changeCity(selectedCity));
      setSorting(SortType.Popular);
      setActiveOfferId(null);
    }
  }, [city, dispatch]);

  const handleSortingChange = useCallback((selectedSorting: Sorting) => {
    setSorting(selectedSorting);
    setActiveOfferId(null);
  }, []);

  const handleOffersRetryClick = () => {
    dispatch(fetchOffersAction());
  };

  if (isOffersLoading || hasOffersError) {
    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          {isOffersLoading ? <Spinner /> : (
            <div className="cities__status-wrapper" role="alert">
              <p className="cities__status">Could not load offers. Please try again.</p>
              <button className="button" type="button" onClick={handleOffersRetryClick}>Try again</button>
            </div>
          )}
        </main>
      </div>
    );
  }

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
          {isEmpty ? <EmptyOffers city={city} /> : (
            <div className="cities__places-container container">
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
              <div className="cities__right-section">
                <Map offers={offers} city={offers[0].city} activeOfferId={activeOfferId} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
