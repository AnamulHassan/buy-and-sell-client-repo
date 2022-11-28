import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/Home/Home';
import Blog from '../pages/Blog/Blog';
import About from '../pages//About/About';
import DashboardLayout from '../layout/DashboardLayout';
import AllSeller from '../pages/Dashboard/AllSeller/AllSeller';
import AllBuyers from '../pages/Dashboard/AllBuyers/AllBuyers';
import ReportedItems from '../pages/Dashboard/ReportedItems/ReportedItems';
import MyOrder from '../pages/Dashboard/MyOrder/MyOrder';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import MyProduct from '../pages/Dashboard/MyProduct/MyProduct';
import MyBuyer from '../pages/Dashboard/MyBuyer/MyBuyer';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

import AdminRoute from './AdminRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProductByCategory from '../pages/Home/ProductByCategory/ProductByCategory';
import WishList from '../pages/Dashboard/WishList/WishList';
import SellerRoute from './SellerRoute';
import PrivateRoute from './PrivateRoute';
import BuyerRoute from './BuyerRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: '/', element: <Home></Home> },
      { path: '/home', element: <Home></Home> },
      {
        path: '/blog',
        element: <Blog></Blog>,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/products/:name',
        element: (
          <PrivateRoute>
            <ProductByCategory></ProductByCategory>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard/all_sellers',
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/all_buyers',
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/reported_items',
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/add_product',
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: '/dashboard/my_product',
        element: (
          <SellerRoute>
            <MyProduct></MyProduct>
          </SellerRoute>
        ),
      },
      {
        path: '/dashboard/my_buyer',
        element: (
          <SellerRoute>
            <MyBuyer></MyBuyer>
          </SellerRoute>
        ),
      },
      {
        path: '/dashboard/wishlist',
        element: (
          <BuyerRoute>
            <WishList></WishList>
          </BuyerRoute>
        ),
      },
      {
        path: '/dashboard/my_orders',
        element: (
          <BuyerRoute>
            <MyOrder></MyOrder>
          </BuyerRoute>
        ),
      },
    ],
  },
]);
export default router;
