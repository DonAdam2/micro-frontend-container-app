import dynamicMiddlewares, { addMiddleware } from 'redux-dynamic-middlewares';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//root reducer
import { reducerSlices } from './reducerSlices';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: reducerSlices,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    if (isDevelopment) {
      const { logger } = require('redux-logger'),
        middlewares = [logger, dynamicMiddlewares];

      return getDefaultMiddleware().concat(middlewares);
    }

    //dynamicMiddlewares is required in production as well to run the middlewares injected by the remote apps
    return getDefaultMiddleware().concat(dynamicMiddlewares);
  },
});

export default store;

//used to merge dynamic reducer slices into static reducer slices
export const createReducer = (asyncReducers) =>
  combineReducers({
    ...reducerSlices,
    ...asyncReducers,
  });

/*slices and middlewares injected by the remote apps, they are kept so that:
- each one is injected only once (remote apps inject them every time they are mounted, e.g. when switching routes)
- slices of all remote apps are kept when a new remote app injects its slices*/
const asyncReducers = {},
  injectedMiddleWares = new Set();

//passed to the remote apps to inject their redux slices into the current store
export const injectSlices = (asyncReducerSlices) => {
  const newSlices = Object.entries(asyncReducerSlices).filter(
    ([key, reducer]) => asyncReducers[key] !== reducer
  );
  if (!newSlices.length) return;

  newSlices.forEach(([key, reducer]) => (asyncReducers[key] = reducer));
  store.replaceReducer(createReducer(asyncReducers));
};

//passed to the remote apps to inject their redux middlewares into the current store
export const injectMiddleWares = (middleWares) => {
  middleWares.forEach((middleWare) => {
    if (injectedMiddleWares.has(middleWare)) return;

    injectedMiddleWares.add(middleWare);
    addMiddleware(middleWare);
  });
};
