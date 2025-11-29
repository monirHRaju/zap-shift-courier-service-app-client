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
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import Parcel from "../pages/Parcel/Parcel";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import MyPayments from "../pages/Dashboard/Payment/PaymentHistory/MyPayments";
import ApproveRiders from "../pages/Dashboard/Rider/ApproveRiders";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";

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
      },
      {
        path: '/parcel',
        element: <PrivateRoute> <Parcel> </Parcel></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
        
      },
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayouts></DashboardLayouts>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },

      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-history',
        Component: MyPayments
      },
      {
        path: 'approve-riders',
        Component: ApproveRiders
      },
      
      {
        path: 'user-management',
        Component: UserManagement
        // element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
      },

    ]
  
  },
  {
    path: '/*',
    Component: Loading
  }
]);