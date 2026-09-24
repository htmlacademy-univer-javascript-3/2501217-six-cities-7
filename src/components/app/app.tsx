import { MainPage } from '../main-page/main-page';

interface AppProps {
  offerCount: number;
}

export const App = ({ offerCount }: AppProps) => <MainPage offerCount={offerCount} />;
