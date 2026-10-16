//use the following package to inject middle wares from the inner app
import { addMiddleware } from 'redux-dynamic-middlewares';
//store
import store, { createReducer } from '@/js/store/store';
//components
import RemoteComponent from '@/js/components/shared/remoteComponent/RemoteComponent';

const CarouselPage = () => {
  const injectMiddleWares = (middleWares) => {
    middleWares.forEach((el) => addMiddleware(el));
  };

  const injectSlices = (asyncReducerSlices) => {
    let asyncReducers = {};
    Object.entries(asyncReducerSlices).forEach((el) => (asyncReducers[el[0]] = el[1]));

    store.replaceReducer(createReducer(asyncReducers));
  };

  return (
    <RemoteComponent
      remote="inner_app/App"
      injectMiddleWares={injectMiddleWares}
      store={store}
      injectSlices={injectSlices}
    />
  );
};

export default CarouselPage;
