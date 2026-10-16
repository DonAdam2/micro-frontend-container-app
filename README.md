# Table of Contents:
- [Overview](#micro-frontend-container)
- [Prerequisites](#prerequisites)
- [Installing & getting started](#installing--getting-started)
- [How to import a remote module and use it](#how-to-import-a-remote-module-and-use-it)
- [How to add a new remote app](#how-to-add-a-new-remote-app)
- [How to inject the remote module store slices into the current store](#how-to-inject-the-remote-module-store-slices-into-the-current-store)
- [Available scripts](#available-scripts)

## Micro frontend container

- Uses ***module federation plugin*** from webpack to inject ***remote modules***.
- This app is the host of [Micro frontend inner app](https://github.com/DonAdam2/micro-frontend-inner-app)

**_Note:_** This app uses live reloading for local development.

## Prerequisites

- nodeJS ^22.18.0 or >=24.11.0, or Docker

## Installing / Getting Started

### Development (locally):

- Clone repo => `git clone git@github.com:react-custom-projects/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies => `yarn install`
- Start the development server => `yarn start`

### Development (using Docker):

- Clone repo => `git clone git@github.com:react-custom-projects/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies (required for prettier) => `yarn install`
- Start the development server => `docker-compose up web-dev`

## Docker for production (_basic setup_) (modify it to your needs):
- Update the **_production_** section of the **_Dockerfile_** to meet your needs
- Run the following command to build your image => `docker-compose up web-prod`

## How to import a _remote module_ and use it

Remote apps are **not** added to the `remotes` object of ***ModuleFederationPlugin***. Webpack caches a remote that failed to load
until the page is refreshed, so the **Try again** button of the error boundary would never work.
Instead, remote apps are loaded at runtime, which allows retrying without refreshing the page:

- **/buildTools/constants.js** => `remotes` object contains the name and the urls of every remote app.
- **/buildTools/webpack.common.js** => injects the remote apps urls into the code as `MF_REMOTES` (using ***DefinePlugin***).
- **/src/js/constants/LoadRemote.js** => loads the `remoteEntry.js` of the remote app, shares the dependencies (react, react-dom, ...) with it and returns the requested module.
- **/src/js/components/shared/remoteComponent/RemoteComponent.jsx** => renders the remote module lazily inside an error boundary (with a loader and a **Try again** button).

Usage:

```
import RemoteComponent from '@/js/components/shared/remoteComponent/RemoteComponent';

<RemoteComponent remote="inner_app/App" />
```

**_Notes:_**
- `remote` format is `remote_app_name/ExposedModule`.
- Any other prop passed to `RemoteComponent` is passed to the remote module, e.g. `<RemoteComponent remote="inner_app/App" store={store} />`.

## How to add a new remote app

1- In the **remote app**, expose the module you want in its ***ModuleFederationPlugin*** and make sure its `shared` dependencies match the current app:

```
new ModuleFederationPlugin({
  name: 'new_remote_app',
  filename: 'remoteEntry.js',
  exposes: {
    './App': path.join(PATHS.src, 'App'),
  },
  shared: { ... },
}),
```

2- In the **current app**, add the remote app to the `remotes` object of **/buildTools/constants.js**:

```
remotes: {
  inner_app: {
    devUrl: 'http://localhost:3001',
    prodUrl: 'http://localhost:8081',
  },
  new_remote_app: {
    devUrl: 'http://localhost:3003',
    prodUrl: 'https://new-remote-app.example.com',
  },
},
```

**_Notes:_**
- The key must be the same as the `name` of the remote app ***ModuleFederationPlugin***.
- The urls are the origins of the remote app (without `/remoteEntry.js`).
- The remote app must allow CORS requests from the current app.

3- Restart the development server (webpack configuration changes are not reloaded automatically).

4- Use the remote module anywhere in the app:

```
<RemoteComponent remote="new_remote_app/App" />
```

## How to inject the _remote module_ store slices into the current store

- Install `redux-dynamic-middlewares` package if the **remote module** has middle wares.

- Open `/src/js/store/store.js` file:

    1- Import `dynamicMiddlewares` from `redux-dynamic-middlewares` package:

    ```
    import dynamicMiddlewares from 'redux-dynamic-middlewares'
    ```
        
    2- Import `configureStore`:

    ```
    import { configureStore } from '@reduxjs/toolkit';
    ```
            
    3- Import your redux slices:
    
    ```
    import { reducerSlices } from './reducerSlices';
    ```
    
    4- Create your redux store and pass to it **dynamicMiddlewares**:
    
    ```
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
    ```

    5- Add **createReducer** function:

    ```
    //used to merge dynamic reducer slices into static reducer slices
    export const createReducer = (asyncReducers) =>
    combineReducers({
      ...reducerSlices,
      ...asyncReducers,
    });
    ```
    
- Open the component in which you want to use the imported module:
    
    1- Import `addMiddleware` from `redux-dynamic-middlewares` package:

    ```
    import { addMiddleware } from 'redux-dynamic-middlewares';
    ```
        
    2- Import current app **store** and **createReducer** function:

   ```
    import store, { createReducer } from '@/js/store/store';
   ```
    
    3- Import the `RemoteComponent`:

    ```
    import RemoteComponent from '@/js/components/shared/remoteComponent/RemoteComponent';
    ```
    
    2- Create **injectMiddleWares** function in the component:

    ```
    const injectMiddleWares = (middleWares) => {
      middleWares.forEach((el) => addMiddleware(el));
    };
    ```

    3- Create **injectSlices** function in the component:

    ```
    const injectSlices = (asyncReducerSlices) => {
      let asyncReducers = {};
      Object.entries(asyncReducerSlices).forEach((el) => (asyncReducers[el[0]] = el[1]));

      store.replaceReducer(createReducer(asyncReducers));
    };
    ```
        
    4- Pass `store`, `injectSlices` and `injectMiddleWares` to the `remote module`:

    ```
    <RemoteComponent
      remote="inner_app/App"
      injectMiddleWares={injectMiddleWares}
      store={store}
      injectSlices={injectSlices}
    />
    ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
It will open [http://localhost:3000](http://localhost:3000) automatically in the browser to see your app.

All changes will be injected automatically without reloading the page.<br>

You will see in the console the following:

- All redux store related changes
- Any of the following errors:
  1. Linting errors.
  2. Code format errors (because of [prettier](https://prettier.io/))

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn build:serve`

Serves the app on [http://localhost:8080](http://localhost:8080) from the `dist` folder to check the production version.

**_Note:_** Use this script only if you ran the build script `yarn build`.

### `yarn analyze-bundle`

It allows you to analyze the bundle size.
