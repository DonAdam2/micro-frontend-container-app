import React, { lazy, Suspense } from 'react';
//store
import { store } from '../../../bootstrap';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';
//import remote micro frontend lazily
const RemoteApp = lazy(() => import('inner_app/App'));

const CarouselPage = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIcon />
			</div>
		}
	>
		<RemoteApp store={store} />
	</Suspense>
);

export default CarouselPage;
