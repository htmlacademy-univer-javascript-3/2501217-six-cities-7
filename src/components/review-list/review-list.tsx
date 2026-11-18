import { ReviewItem } from '@/components/review-item/review-item';
import { MAX_REVIEWS_COUNT } from '@/const';
import type { Review } from '@/types/offer';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  const visibleReviews = [...reviews]
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {visibleReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
};
