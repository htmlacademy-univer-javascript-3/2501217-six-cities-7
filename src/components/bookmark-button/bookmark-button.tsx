import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, RequestStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { updateFavoriteAction } from '@/store/api-actions';
import { getAuthorizationStatus, getFavoritesStatus, getIsFavorite, getIsFavoriteUpdating } from '@/store/selectors';
import type { Offer } from '@/types/offer';

interface BookmarkButtonProps {
  offerId: Offer['id'];
  variant: 'place-card' | 'offer';
}

export const BookmarkButton = ({ offerId, variant }: BookmarkButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const isFavorite = useAppSelector((state) => getIsFavorite(state, offerId));
  const isUpdating = useAppSelector((state) => getIsFavoriteUpdating(state, offerId));
  const isLoading = useAppSelector((state) => {
    const status = getFavoritesStatus(state);
    return status === RequestStatus.Idle || status === RequestStatus.Loading;
  });
  const isDetailed = variant === 'offer';

  const handleBookmarkClick = () => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(updateFavoriteAction({ offerId, isFavorite: !isFavorite }));
  };

  return (
    <button
      className={`${variant}__bookmark-button${isFavorite ? ` ${variant}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={handleBookmarkClick}
      disabled={isAuthorized && (isLoading || isUpdating)}
      aria-pressed={isFavorite}
      aria-busy={isUpdating}
    >
      <svg className={`${variant}__bookmark-icon`} width={isDetailed ? 31 : 18} height={isDetailed ? 33 : 19} aria-hidden="true">
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
};
