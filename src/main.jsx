import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Fix from './Components/Fix';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Register from './Components/Register';
import Map from './Components/Map';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Fix></Fix>,
    children: [{
      path: '/',
      element: <Home></Home>,
    },
    {
      path: '/about',
      element: <About></About>,
    }, {
      path: '/login',
      element: <Login></Login>
    }, {
      path: '/register',
      element: <Register></Register>
    }, {
      path: '/map',
      element: <Map></Map>
    }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
