import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { Header } from '@/components/header/header';
import { Spinner } from '@/components/spinner/spinner';
import { AppRoute, AuthorizationStatus, MIN_PASSWORD_LENGTH } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { loginAction } from '@/store/api-actions';
import { getAuthError, getAuthorizationStatus, getIsLoginLoading } from '@/store/selectors';
import type { AuthData } from '@/types/auth';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLoginLoading = useAppSelector(getIsLoginLoading);
  const error = useAppSelector(getAuthError);
  const [formData, setFormData] = useState<AuthData>({ email: '', password: '' });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const email = formData.email.trim();

    if (!isLoginLoading && email && formData.password.trim()) {
      dispatch(loginAction({ email, password: formData.password }));
    }
  };

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner message="Checking authorization..." />;
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} replace />;
  }

  return (
    <div className="page page--gray page--login">
      <Header hideNavigation />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleFormSubmit} aria-busy={isLoginLoading} aria-describedby={error ? 'login-error' : undefined}>
              {error && <p id="login-error" role="alert">{error}</p>}
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  className="login__input form__input"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="username"
                  value={formData.email}
                  onChange={(evt) => setFormData((current) => ({ ...current, email: evt.target.value }))}
                  disabled={isLoginLoading}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  className="login__input form__input"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  minLength={MIN_PASSWORD_LENGTH}
                  pattern="(?=.*[A-Za-z])(?=.*[0-9]).+"
                  title="Use at least one letter and one number."
                  value={formData.password}
                  onChange={(evt) => setFormData((current) => ({ ...current, password: evt.target.value }))}
                  disabled={isLoginLoading}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={isLoginLoading}>
                {isLoginLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
