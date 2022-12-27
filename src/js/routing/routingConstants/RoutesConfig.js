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
  },
];
