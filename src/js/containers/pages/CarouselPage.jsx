//store
import store, { injectMiddleWares, injectSlices } from '@/js/store/store';
//components
import RemoteComponent from '@/js/components/shared/remoteComponent/RemoteComponent';

const CarouselPage = () => (
  <RemoteComponent
    remote="inner_app/App"
    injectMiddleWares={injectMiddleWares}
    store={store}
    injectSlices={injectSlices}
  />
);

export default CarouselPage;
