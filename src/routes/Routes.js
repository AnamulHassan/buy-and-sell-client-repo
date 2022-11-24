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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
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
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: '/dashboard/all_sellers', element: <AllSeller></AllSeller> },
      { path: '/dashboard/all_buyers', element: <AllBuyers></AllBuyers> },
      {
        path: '/dashboard/reported_items',
        element: <ReportedItems></ReportedItems>,
      },
      {
        path: '/dashboard/my_orders',
        element: <MyOrder></MyOrder>,
      },
      {
        path: '/dashboard/add_product',
        element: <AddProduct></AddProduct>,
      },
      {
        path: '/dashboard/my_product',
        element: <MyProduct></MyProduct>,
      },
      {
        path: '/dashboard/my_buyer',
        element: <MyBuyer></MyBuyer>,
      },
    ],
  },
]);
export default router;
