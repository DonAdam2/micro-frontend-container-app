import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//root reducer
import { reducerSlices } from './reducerSlices';

const isDevelopment = process.env.NODE_ENV === 'development';

export default configureStore({
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

//used to merge dynamic reducer slices into static reducer slices
export const createReducer = (asyncReducers) =>
  combineReducers({
    ...reducerSlices,
    ...asyncReducers,
  });
