import { memo } from 'react';

import { PlaceCard } from '@/components/place-card/place-card';
import type { Offer } from '@/types/offer';

interface OfferListProps {
  offers: Offer[];
  className?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  onActiveOfferChange?: (offerId: Offer['id'] | null) => void;
}

const OfferListView = ({ offers, className = 'places__list', cardClassName = 'cities__card ', imageWrapperClassName, onActiveOfferChange }: OfferListProps) => (
  <div className={className}>
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        className={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
        onActiveOfferChange={onActiveOfferChange}
      />
    ))}
  </div>
);

export const OfferList = memo(OfferListView);
