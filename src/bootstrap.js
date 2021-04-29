import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
//import meta image
import './assets/images/metaImage.jpg';
// required for babel polyfills
import 'regenerator-runtime/runtime';
//store configuration
import configureStore from './js/store/configureStore';
//root component
import App from './App';
//styles
import './scss/global.scss';
//constants
import { history } from './js/constants/AppConstants';

export const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
