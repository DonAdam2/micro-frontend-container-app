import React, { lazy, Suspense } from 'react';
//use the following package to inject middle wares from the inner app
import { addMiddleware } from 'redux-dynamic-middlewares';
//store
import store from '@/js/store/store';
//redux slices
import { rootReducer } from '@/js/store/rootReducer';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';
import { combineReducers } from '@reduxjs/toolkit';
//import remote micro frontend lazily
const RemoteApp = lazy(() => import('inner_app/App'));

function createReducer(asyncReducers) {
  return combineReducers({
    ...rootReducer,
    ...asyncReducers,
  });
}

const CarouselPage = () => {
  const addMiddleWares = (middleWares) => {
    middleWares.forEach((el) => addMiddleware(el));
  };

  const injectReducer = (asyncReducerSlices) => {
    let asyncReducers = {};
    Object.entries(asyncReducerSlices).forEach((el) => (asyncReducers[el[0]] = el[1]));

    store.replaceReducer(createReducer(asyncReducers));
  };

  return (
    <Suspense
      fallback={
        <div className="loader-wrapper">
          <LoadingIcon />
        </div>
      }
    >
      <RemoteApp addMiddleWares={addMiddleWares} store={store} injectReducer={injectReducer} />
    </Suspense>
  );
};

export default CarouselPage;
