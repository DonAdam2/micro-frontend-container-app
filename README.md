## Micro frontend container:

- Uses ***module federation plugin*** from webpack to inject ***remote modules***.
- You can add as many ***remote modules*** as you like by adding them to the remotes object 
of ***module federation plugin*** in **/buildTools/webpack.common.js** 
- **/buildTools/constants** contains the production ***URL*** of the  ***remote module***.

**_Note:_** Hot reloading is not working well with ***module federation plugin***.

## How to import a ***remote module*** and use it:
- Open **webpack.common.js** file.
- Add the link of the ***remote module*** in `remotes object` of the ***ModuleFederationPlugin***, example:
`inner_app: inner_app@${isDevelopment ? remoteDevUrl : remoteProdUrl}/remoteEntry.js,`
- Import the ***remote module*** lazily in the required place, example:
`const RemoteApp = lazy(() => import('inner_app/App'));`
- Use it:
`<RemoteApp
 	store={store}
 />`

**_Note:_** If you don't want to inject the store of the ***remote module*** as a slice of the container app store => 
you don't need to pass the container store to the ***remote module***.

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

Serves the app on `http://localhost:8080/` from the `dist` folder to check the production version.

**_Note:_** Use this script only if you ran the build script `yarn build`.

### `yarn analyze-bundle`

It allows you to analyze the bundle size.
