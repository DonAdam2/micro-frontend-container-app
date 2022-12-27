import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { configureStore } from '@reduxjs/toolkit';
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

    return getDefaultMiddleware();
  },
});
