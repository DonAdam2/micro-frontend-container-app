import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
//use the following package to inject middle wares from the inner app
import { addMiddleware } from 'redux-dynamic-middlewares';
//store
import store from '@/js/store/store';
//redux slices
import { reducerSlices } from '@/js/store/reducerSlices';
//error boundary fallback UI
import RemoteEntryErrorBoundaryFallback from '@/js/generic/RemoteEntryErrorBoundaryFallback';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';
import { combineReducers } from '@reduxjs/toolkit';
//import remote micro frontend lazily
const RemoteApp = lazy(() => import('inner_app/App'));

function createReducer(asyncReducers) {
  return combineReducers({
    ...reducerSlices,
    ...asyncReducers,
  });
}

const CarouselPage = () => {
  const injectMiddleWares = (middleWares) => {
    middleWares.forEach((el) => addMiddleware(el));
  };

  const injectSlices = (asyncReducerSlices) => {
    let asyncReducers = {};
    Object.entries(asyncReducerSlices).forEach((el) => (asyncReducers[el[0]] = el[1]));

    store.replaceReducer(createReducer(asyncReducers));
  };

  return (
    <ErrorBoundary
      FallbackComponent={RemoteEntryErrorBoundaryFallback}
      onReset={() => {
        //Reset the state of your app so the error doesn't happen again
        console.log('Try again clicked');
      }}
    >
      <Suspense
        fallback={
          <div className="loader-wrapper">
            <LoadingIcon />
          </div>
        }
      >
        <RemoteApp
          injectMiddleWares={injectMiddleWares}
          store={store}
          injectSlices={injectSlices}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CarouselPage;
