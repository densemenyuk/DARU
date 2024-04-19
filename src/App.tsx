import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthLayout } from './components/layout/AuthLayout';
import { MainLayout } from './components/layout/MainLayout';
import { CategoriesPage } from './pages/EventCategories';
import { EventDetails } from './pages/EventDetails';
import { EventsPage } from './pages/EventsNew';
import { IndexPage } from './pages/IndexPage';
import { RegisterPage } from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/events/:type',
        element: <EventsPage />,
      },
      {
        path: '/events/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/events/details/:id',
        element: <EventDetails />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
