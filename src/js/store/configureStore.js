import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//root reducer
import reducerSlices from './reducerSlices';
//middle wares
import thunkMiddleware from 'redux-thunk';

const isDevelopment = process.env.NODE_ENV === 'development',
	middlewares = [];

// log redux data in development mode only
if (isDevelopment) {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

const configureStore = () => {
	const apply = applyMiddleware(thunkMiddleware, ...middlewares),
		store = createStore(
			createReducer(),
			/* preloadedState, */
			//use redux dev tool in development only
			isDevelopment ? composeWithDevTools(apply) : apply
		);

	// enable hot loading in development mode only
	if (isDevelopment && module.hot) {
		module.hot.accept('./reducerSlices', () => store.replaceReducer(createReducer()));
	}

	//used to inject remote reducers
	store.asyncReducers = {};

	store.injectReducer = (asyncReducerSlices) => {
		Object.entries(asyncReducerSlices).forEach((el) => (store.asyncReducers[el[0]] = el[1]));

		store.replaceReducer(createReducer(store.asyncReducers));
	};

	return store;
};

function createReducer(asyncReducers) {
	return combineReducers({
		...reducerSlices,
		...asyncReducers,
	});
}

export default configureStore;
