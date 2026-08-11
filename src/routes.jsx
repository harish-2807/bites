import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import NotFound from './pages/NotFound';
import RestaurantDetails from './pages/RestaurantDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'restaurants', element: <Restaurants /> },
      { path: 'restaurants/:id', element: <RestaurantDetails /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-confirmed', element: <OrderConfirmation /> },
      { path: 'track-order', element: <TrackOrder /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
