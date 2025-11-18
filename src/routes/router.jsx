import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Faq from "../pages/Home/FAQ/Faq";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About";
import Error from "../pages/Error/Error";
import Loading from "../pages/Loading/Loading";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/AuthPages/Login/Login";
import Register from "../pages/AuthPages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: '/faq',
          Component: Faq
        },
        {
          path: '/coverage',
          Component: Coverage, 
          loader: () => fetch('/serviceCenters.json').then(res => res.json())
        },
        {
          path: '/about',
          Component: About
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/*',
    Component: Error
  }
]);