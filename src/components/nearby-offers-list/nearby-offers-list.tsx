import { OfferList } from '@/components/offer-list/offer-list';
import type { Offer } from '@/types/offer';

interface NearbyOffersListProps {
  offers: Offer[];
}

export const NearbyOffersList = ({ offers }: NearbyOffersListProps) => (
  <section className="near-places places">
    <h2 className="near-places__title">
      Other places in the neighbourhood
    </h2>
    <OfferList
      offers={offers}
      className="near-places__list places__list"
      cardClassName="near-places__card "
      imageWrapperClassName="near-places__image-wrapper"
    />
  </section>
);
