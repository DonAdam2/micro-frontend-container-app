import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//store
import { store } from './bootstrap';
//components
import LoadingIcon from './js/components/shared/loadingIcon/LoadingIcon';
import TestComponent from './js/containers/TestComponent';
//import remote micro frontend lazily
const RemoteApp = React.lazy(() => import('inner_app/App'));

const App = () => (
	<Suspense
		fallback={
			<div className="loader-wrapper">
				<LoadingIcon />
			</div>
		}
	>
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onReset={() => {
				//Reset the state of your app so the error doesn't happen again
				console.log('Try again clicked');
			}}
		>
			<TestComponent />
			<RemoteApp store={store} />
		</ErrorBoundary>
	</Suspense>
);

export default hot(App);
