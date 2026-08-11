import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { FoodFilterProvider } from './context/FoodFilterContext';

export default function App() {
  return (
    <CartProvider>
      <FoodFilterProvider>
        <RouterProvider router={router} />
      </FoodFilterProvider>
    </CartProvider>
  );
}
