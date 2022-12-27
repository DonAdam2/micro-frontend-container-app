import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { rootReducer } from './rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';

export default configureStore({
  reducer: rootReducer,
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
