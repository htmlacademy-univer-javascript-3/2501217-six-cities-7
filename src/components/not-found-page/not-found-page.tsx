import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

export const NotFoundPage = () => (
  <main className="page page--gray">
    <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
      <h1>404 — Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={AppRoute.Main}>Go to the main page</Link>
    </div>
  </main>
);
