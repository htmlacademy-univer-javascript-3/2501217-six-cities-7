import { Fragment, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, REVIEW_RATING_RANGE } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { postReviewAction } from '@/store/api-actions';
import { getIsReviewSubmitting } from '@/store/selectors';
import type { Offer } from '@/types/offer';

interface ReviewFormProps {
  offerId: Offer['id'];
}

const REVIEW_RATINGS = [5, 4, 3, 2, 1] as const;

export const ReviewForm = ({ offerId }: ReviewFormProps) => {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getIsReviewSubmitting);
  const [review, setReview] = useState({ comment: '', rating: '' });
  const isMountedRef = useRef(false);
  const selectedRating = Number(review.rating);
  const isRatingInRange = selectedRating >= REVIEW_RATING_RANGE.min && selectedRating <= REVIEW_RATING_RANGE.max;
  const comment = review.comment.trim();
  const isValid = comment.length >= MIN_REVIEW_LENGTH && comment.length <= MAX_REVIEW_LENGTH && isRatingInRange;

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    dispatch(postReviewAction({ offerId, comment, rating: selectedRating })).then((action) => {
      if (isMountedRef.current && postReviewAction.fulfilled.match(action)) {
        setReview({ comment: '', rating: '' });
      }
    });
  };

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_RATINGS.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={review.rating === String(rating)}
              onChange={(evt) => setReview((current) => ({ ...current, rating: evt.target.value }))}
              disabled={isSubmitting}
            />
            <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={['perfect', 'good', 'not bad', 'badly', 'terribly'][REVIEW_RATING_RANGE.max - rating]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay"
        value={review.comment}
        onChange={(evt) => setReview((current) => ({ ...current, comment: evt.target.value }))}
        minLength={MIN_REVIEW_LENGTH}
        maxLength={MAX_REVIEW_LENGTH}
        disabled={isSubmitting}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
