//urls
import { getCarouselPageUrl, getHomePageUrl } from './AppUrls';
//pages
import CarouselPage from '../../containers/pages/CarouselPage';
import HomePage from '../../containers/pages/HomePage';

export const routes = [
	{
		path: getHomePageUrl(),
		Component: HomePage,
		label: 'Home',
		exact: true,
	},
	{
		path: getCarouselPageUrl(),
		Component: CarouselPage,
		label: 'Carousel',
	},
];
