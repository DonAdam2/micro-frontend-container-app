## Micro frontend container:

- Uses ***module federation plugin*** from webpack to inject ***remote modules***.

**_Note:_** Hot reloading is not working well with ***module federation plugin***.

## How to import a ***remote module*** and use it:
- Open **webpack.common.js** file.<br>
    1- Import ***ModuleFederationPlugin***:<br>
    `ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')` <br> <br>
    2- Pass ***ModuleFederationPlugin*** to the ***plugins*** array:<br>
    `plugins: [
                new ModuleFederationPlugin({`<br><br>
    3- Specify the name of the current app in ***ModuleFederationPlugin***:<br>
    `new ModuleFederationPlugin({
        name: 'app_container',`<br><br>
    4- Add the link of the ***remote module*** in `remotes object` of the ***ModuleFederationPlugin***, example:<br>
    `new ModuleFederationPlugin({
        remotes: {
        inner_app: 'inner_app@${isDevelopment ? remoteDevUrl : remoteProdUrl}/remoteEntry.js',
        },`<br><br>
        
     **_Notes:_** 
     - You must use the name of the ***remote module*** that you specified in the ***remote module*** setup.
     - You can add as many ***remote modules*** as you like by adding them to the `remotes object` 
     - **/buildTools/constants** contains ***remoteDevUrl*** and ***remoteProdUrl*** of the  ***remote module***.
        
    5- Add the shared dependencies in ***ModuleFederationPlugin***:<br>
    `new ModuleFederationPlugin({
        shared: ['react', 'react-dom'],
        }),`<br><br>
 	
- Import the ***remote module*** lazily in the required place, example:<br>
`const RemoteApp = lazy(() => import('inner_app/App'));`
- Use it:
`<RemoteApp
 	store={store}
 />`

**_Notes:_** 
- If you don't want to inject the store of the ***remote module*** as a slice of the host store => <br> 
you don't need to pass the host store to the ***remote module***.
- If you want to inject the store of the ***remote module*** as a slice of the host store => <br> 
you need to set up the store of the ***remote module*** to have such functionality
 ***(open the inner-app repository to check the setup)***

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
