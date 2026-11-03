//urls
import { getCarouselPageUrl, getHomePageUrl } from './AppUrls';
//pages
import CarouselPage from '../../containers/pages/CarouselPage';
import HomePage from '../../containers/pages/HomePage';

export const routes = [
  {
    path: getHomePageUrl(),
    element: <HomePage />,
    label: 'Home',
  },
  {
    path: getCarouselPageUrl(),
    element: <CarouselPage />,
    label: 'Carousel',
    //the remote apps of the page handle the urls under it (e.g. /carousel/second), see App.jsx
    hasInnerRoutes: true,
  },
];
