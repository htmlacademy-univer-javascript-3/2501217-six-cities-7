import { PlaceCard } from '@/components/place-card/place-card';
import type { Offer } from '@/types/offer';

interface OfferListProps {
  offers: Offer[];
  className?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  onActiveOfferChange?: (offerId: Offer['id'] | null) => void;
}

export const OfferList = ({ offers, className = 'places__list', cardClassName = 'cities__card ', imageWrapperClassName, onActiveOfferChange }: OfferListProps) => (
  <div className={className}>
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        className={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
        onMouseEnter={onActiveOfferChange}
        onMouseLeave={() => onActiveOfferChange?.(null)}
      />
    ))}
  </div>
);
