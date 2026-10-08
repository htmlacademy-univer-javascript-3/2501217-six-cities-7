import { Link } from 'react-router-dom';

import { AppRoute } from '@/const';
import type { Offer } from '@/types/offer';

interface PlaceCardProps {
  offer: Offer;
  className?: string;
  onMouseEnter?: (offerId: string) => void;
}

export const PlaceCard = ({ offer, className = '', onMouseEnter }: PlaceCardProps) => {
  const { id, previewImage, price, title, type, isPremium, isFavorite, rating } = offer;
  const cardClassName = `${className}place-card`.trim();
  const bookmarkClassName = isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  return (
    <article className={cardClassName} onMouseEnter={() => onMouseEnter?.(id)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>
            Premium
          </span>
        </div>
      )}
      <div className={`${className.includes('favorites__card') ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{price}
            </b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>
          <button className={bookmarkClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }} />
            <span className="visually-hidden">
              Rating
            </span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">
          {type}
        </p>
      </div>
    </article>
  );
};
