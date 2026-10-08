import { useState } from 'react';

import { PlaceCard } from '@/components/place-card/place-card';
import type { Offer } from '@/types/offer';

interface OfferListProps {
  offers: Offer[];
  className?: string;
  cardClassName?: string;
}

export const OfferList = ({ offers, className = 'places__list', cardClassName = 'cities__card ' }: OfferListProps) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className={className} data-active-offer={activeOfferId ?? undefined}>
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} className={cardClassName} onMouseEnter={setActiveOfferId} />
      ))}
    </div>
  );
};
