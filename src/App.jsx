import { Route, Routes } from 'react-router-dom';
//routes
import { routes } from './js/routing/routingConstants/RoutesConfig';
//pages
import NotFoundPage from './js/containers/pages/NotFoundPage';
//containers
import AppHeader from './js/containers/AppHeader';

const App = () => (
  <>
    <AppHeader />
    <Routes>
      {routes.map((route, routeIndex) => (
        <Route
          key={routeIndex}
          //"/*" lets the remote apps of the page declare their own routes under its url
          path={route.hasInnerRoutes ? `${route.path}/*` : route.path}
          element={route.element}
        />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
