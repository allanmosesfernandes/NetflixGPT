import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './components/Browse.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/browse',
        element: <Browse />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
