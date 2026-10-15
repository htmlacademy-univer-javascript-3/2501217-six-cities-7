import { Fragment, useState } from 'react';
import type { FormEvent } from 'react';

export const ReviewForm = () => {
  const [review, setReview] = useState({ comment: '', rating: '' });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={review.rating === String(rating)}
              onChange={(evt) => setReview((current) => ({ ...current, rating: evt.target.value }))}
            />
            <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - rating]}>
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={review.comment.trim().length < 50 || !review.rating}>
          Submit
        </button>
      </div>
    </form>
  );
};
