## Micro frontend container:

- Uses ***module federation plugin*** from webpack to inject ***remote modules***.
- This app is the host of [Micro frontend inner app](https://github.com/DonAdam2/micro-frontend-inner-app)

**_Note:_** This app uses live reloading for local development.

## How to import a ***remote module*** and use it:
- Open **webpack.common.js** file.<br>
  1- Import ***ModuleFederationPlugin***:

  ```
  const { ModuleFederationPlugin } = require('webpack').container
  ```

  2- Pass ***ModuleFederationPlugin*** to the ***plugins*** array:

  ```plugins: [
  new ModuleFederationPlugin({
  ```

  3- Specify the name of the current app 678 in ***ModuleFederationPlugin***:

  ```new ModuleFederationPlugin({
  name: 'app_container',
  ```

  4- Add the link of the ***remote module*** in `remotes object` of the ***ModuleFederationPlugin***, example:

  ```
  new ModuleFederationPlugin({
    remotes: {
      inner_app: `inner_app@${isDevelopment ? remoteDevUrl : remoteProdUrl}/remoteEntry.js`,
    },
  ```

  **_Notes:_**
    - You must use the name of the ***remote module*** that you specified in the ***remote module*** webpack setup.
    - You can add as many ***remote modules*** as you like by adding them to the `remotes object`
    - **/buildTools/constants** contains ***remoteDevUrl*** and ***remoteProdUrl*** of the  ***remote module***.

  5- Add the shared dependencies in ***ModuleFederationPlugin***:

  ```
  new ModuleFederationPlugin({
    shared: ['react', 'react-dom'],
  }),
  ```

  6- Install **external-remotes-plugin** and add it below ***ModuleFederationPlugin*** in the plugins array:

  ```
  //used to make sure that remote modules are loaded before the main bundle
  new ExternalTemplateRemotesPlugin(),
  ```

- Import the ***remote module*** lazily in the required place, example:

  ```
  const RemoteApp = lazy(() => import('inner_app/App'));
  ```

- Use it inside ErrorBoundary component:

  ```
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
        <RemoteApp />
      </Suspense>
    </ErrorBoundary>
  ```

## How to inject the **remote module** store into the current store:

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
    
- Open the component in which you want to use the imported module:
    
    1- Import `addMiddleware` from `redux-dynamic-middlewares` package:

    ```
    import { addMiddleware } from 'redux-dynamic-middlewares';
    ```
        
    2- Import current app store:

   ```
    import { store } from '../../../bootstrap';
   ```
    
    3- Import the `remote module` lazily:

    ```
    const RemoteApp = lazy(() => import('inner_app/App'));
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
    <RemoteApp
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
