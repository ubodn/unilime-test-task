import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { ProductsPage } from './components/ProductsPage';
import  { BasePage }  from './components/BasePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;