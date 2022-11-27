import Navbar from '../pages/Shared/Navbar/Navbar';
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Link, Navigate, Outlet } from 'react-router-dom';
import useTitle from '../hook/useTitle';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import LoaderPrimary from '../components/LoaderPrimary/LoaderPrimary';
import { useQuery } from '@tanstack/react-query';

const DashboardLayout = () => {
  useTitle('Pay&Buy Dashboard');
  const [activeIndex, setActiveIndex] = useState(3);
  const { user } = useContext(AuthContext);
  const { data: userRole = {}, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/user?email=${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });
  const adminDashboard = [
    {
      label: <Link to="/dashboard/all_sellers">All Sellers</Link>,
      icon: 'pi pi-fw pi-shopping-cart',
    },
    {
      label: <Link to="/dashboard/all_buyers">All Buyers</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
    {
      label: <Link to="/dashboard/reported_items">Reported Items</Link>,
      icon: 'pi pi-fw pi-thumbs-down-fill',
    },
  ];

  const buyerDashboard = [
    {
      label: <Link to="/dashboard/my_orders">My Orders</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
    {
      label: <Link to="/dashboard/wishlist">My Wishlist</Link>,
      icon: 'pi pi-fw pi-heart',
    },
  ];
  const sellerDashboard = [
    {
      label: <Link to="/dashboard/add_product">Add Product</Link>,
      icon: 'pi pi-fw pi-paperclip',
    },
    {
      label: <Link to="/dashboard/my_product">My Products</Link>,
      icon: 'pi pi-fw pi-list',
    },
    {
      label: <Link to="/dashboard/my_buyer">My Buyers</Link>,
      icon: 'pi pi-fw pi-user',
    },
  ];

  return (
    <section>
      <Navbar></Navbar>
      {isLoading ? (
        <LoaderPrimary></LoaderPrimary>
      ) : (
        <div className="card w-11/12 mx-auto mt-6">
          <TabMenu
            model={
              userRole?.isAdmin
                ? adminDashboard
                : userRole?.isSeller
                ? sellerDashboard
                : buyerDashboard
            }
            activeIndex={activeIndex}
            onTabChange={e => setActiveIndex(e.index)}
          />
          <Outlet></Outlet>
        </div>
      )}
      <div></div>
    </section>
  );
};

export default DashboardLayout;
