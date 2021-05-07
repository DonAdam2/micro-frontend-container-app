import React, { lazy, Suspense } from 'react';
//use the following package to inject middle wares from the inner app
// import { addMiddleware } from 'redux-dynamic-middlewares';
//store
import { store } from '../../../bootstrap';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';
//import remote micro frontend lazily
const RemoteApp = lazy(() => import('inner_app/App'));

const CarouselPage = () => {
	/*const addMiddleWares = (middleWares) => {
		middleWares.forEach((el) => addMiddleware(el));
	};*/

	return (
		<Suspense
			fallback={
				<div className="loader-wrapper">
					<LoadingIcon />
				</div>
			}
		>
			<RemoteApp
				// addMiddleWares={addMiddleWares}
				store={store}
			/>
		</Suspense>
	);
};

export default CarouselPage;
