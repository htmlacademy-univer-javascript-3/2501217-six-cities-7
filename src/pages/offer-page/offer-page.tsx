import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, MAX_OFFER_IMAGES_COUNT, NEARBY_OFFERS_COUNT, RATING_PERCENTAGE_SCALE, RequestStatus, REVIEW_RATING_RANGE } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { clearOffer } from '@/store/action';
import { fetchOfferAction } from '@/store/api-actions';
import { getAuthorizationStatus, getIsOfferNotFound, getNearbyOffers, getOffer, getOfferComments, getOfferStatus, getRequestedOfferId, getReviewError } from '@/store/selectors';
import { Header } from '@/components/header/header';
import { Map } from '@/components/map/map';
import { NearbyOffersList } from '@/components/nearby-offers-list/nearby-offers-list';
import { ReviewForm } from '@/components/review-form/review-form';
import { ReviewList } from '@/components/review-list/review-list';
export const OfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(getOfferComments);
  const status = useAppSelector(getOfferStatus);
  const requestedOfferId = useAppSelector(getRequestedOfferId);
  const isOfferNotFound = useAppSelector(getIsOfferNotFound);
  const reviewError = useAppSelector(getReviewError);

  useEffect(() => {
    if (!id) {
      return;
    }

    const request = dispatch(fetchOfferAction(id));

    return () => {
      request.abort();
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (requestedOfferId !== id || status === RequestStatus.Idle || status === RequestStatus.Loading) {
    return null;
  }

  if (isOfferNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (status === RequestStatus.Error || !offer) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer container">
          <p role="alert">Could not load the offer. Please try again later.</p>
        </main>
      </div>
    );
  }

  const cityNearbyOffers = nearbyOffers.slice(0, NEARBY_OFFERS_COUNT);
  const ratingWidth = `${(Math.round(offer.rating) / REVIEW_RATING_RANGE.max) * RATING_PERCENTAGE_SCALE}%`;
  const galleryImages = offer.images.slice(0, MAX_OFFER_IMAGES_COUNT);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.map((image) => (
                <div className="offer__image-wrapper" key={`${offer.id}-${image}`}>
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>
                    Premium
                  </span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button${offer.isFavorite ? ' offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">
                    Rating
                  </span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{offer.price}
                </b>
                <span className="offer__price-text">
                  &nbsp;night
                </span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">
                  What&apos;s inside
                </h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">
                  Meet the host
                </h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper${offer.host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt={offer.host.name} />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={comments} />
                {reviewError && <p role="alert">{reviewError}</p>}
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm key={offer.id} offerId={offer.id} />}
              </section>
            </div>
          </div>
          <Map offers={[...cityNearbyOffers, offer]} activeOfferId={offer.id} city={offer.city} className="offer__map map" />
        </section>
        <div className="container">
          <NearbyOffersList offers={cityNearbyOffers} />
        </div>
      </main>
    </div>
  );
};
