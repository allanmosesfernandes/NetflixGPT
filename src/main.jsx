import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './components/Browse.jsx';
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import './index.css';
import store from './utils/store.js';


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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
