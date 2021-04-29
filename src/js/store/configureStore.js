import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//root reducer
import rootReducer from './rootReducer';
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
		module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
	}

	//used to inject reducers async
	store.asyncReducers = {};

	store.injectReducer = (key, asyncReducer) => {
		store.asyncReducers[key] = asyncReducer;
		store.replaceReducer(createReducer(store.asyncReducers));
	};

	return store;
};

function createReducer(asyncReducers) {
	return combineReducers({
		...rootReducer,
		...asyncReducers,
	});
}

export default configureStore;
