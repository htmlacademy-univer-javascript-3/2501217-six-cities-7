import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { logoutAction } from '@/store/api-actions';
import { getAuthError, getAuthorizationStatus, getFavoriteOfferCount, getFavoriteUpdateError, getIsLogoutLoading, getUser } from '@/store/selectors';

interface HeaderProps {
  hideNavigation?: boolean;
}

const HeaderView = ({ hideNavigation = false }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteCount = useAppSelector(getFavoriteOfferCount);
  const isLogoutLoading = useAppSelector(getIsLogoutLoading);
  const error = useAppSelector(getAuthError);
  const favoriteError = useAppSelector(getFavoriteUpdateError);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth && user !== null;

  const handleSignOutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!hideNavigation && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img className="user__avatar" src={user.avatarUrl} alt="" width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button className="header__nav-link button" type="button" onClick={handleSignOutClick} disabled={isLogoutLoading}>
                        <span className="header__signout">{isLogoutLoading ? 'Signing out...' : 'Sign out'}</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
        {isAuthorized && error && <p role="alert">{error}</p>}
        {isAuthorized && favoriteError && <p role="alert">{favoriteError}</p>}
      </div>
    </header>
  );
};

export const Header = memo(HeaderView);
