import { Link } from 'react-router-dom';

import { Header } from '@/components/header/header';
import { AppRoute } from '@/const';
import './not-found-page.css';

interface NotFoundPageProps {
  title?: string;
  description?: string;
}

export const NotFoundPage = ({ title = 'Page not found', description = 'The page you are looking for does not exist or may have moved.' }: NotFoundPageProps) => (
  <div className="page page--gray">
    <Header />
    <main className="page__main not-found">
      <section className="container not-found__content">
        <span className="not-found__code" aria-label="Error 404">
          404
        </span>
        <h1 className="not-found__title">
          {title}
        </h1>
        <p className="not-found__description">
          {description}
        </p>
        <Link className="not-found__link button" to={AppRoute.Main}>Go to the main page</Link>
      </section>
    </main>
  </div>
);
