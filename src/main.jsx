import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx';
import Browse from './components/Browse.jsx';

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
