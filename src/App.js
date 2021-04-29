import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//routes
import { routes } from './js/routing/routingConstants/RoutesConfig';
//pages
import NotFoundPage from './js/containers/pages/NotFoundPage';

const App = () => (
	<ErrorBoundary
		FallbackComponent={ErrorBoundaryFallback}
		onReset={() => {
			//Reset the state of your app so the error doesn't happen again
			console.log('Try again clicked');
		}}
	>
		<Switch>
			{routes.map((el, i) => (
				<Route path={el.path} render={() => <el.Component />} key={i} exact={el.exact} />
			))}
			<Route path="*" render={() => <NotFoundPage />} />
		</Switch>
	</ErrorBoundary>
);

export default hot(App);
