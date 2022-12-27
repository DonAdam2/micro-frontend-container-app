import React from 'react';
import { Route, Routes } from 'react-router-dom';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//routes
import { routes } from './js/routing/routingConstants/RoutesConfig';
//pages
import NotFoundPage from './js/containers/pages/NotFoundPage';
//containers
import AppHeader from './js/containers/AppHeader';

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      //Reset the state of your app so the error doesn't happen again
      console.log('Try again clicked');
    }}
  >
    <AppHeader />
    <Routes>
      {routes.map((route, routeIndex) => (
        <Route key={routeIndex} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </ErrorBoundary>
);

export default App;
