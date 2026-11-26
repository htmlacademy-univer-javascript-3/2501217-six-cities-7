import { ReviewForm } from '@/components/review-form/review-form';
import { ReviewList } from '@/components/review-list/review-list';
import { AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks/use-store';
import { getAuthorizationStatus, getOfferComments, getReviewError } from '@/store/selectors';
import type { Offer } from '@/types/offer';

interface OfferReviewsProps {
  offerId: Offer['id'];
}

export const OfferReviews = ({ offerId }: OfferReviewsProps) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector(getOfferComments);
  const reviewError = useAppSelector(getReviewError);

  return (
    <section className="offer__reviews reviews">
      <ReviewList reviews={comments} />
      {reviewError && <p role="alert">{reviewError}</p>}
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offerId} />}
    </section>
  );
};
