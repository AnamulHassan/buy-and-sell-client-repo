import Navbar from '../pages/Shared/Navbar/Navbar';
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  const adminDashboard = [
    {
      label: <Link to="/dashboard/all_sellers">All Sellers</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
    {
      label: <Link to="/dashboard/all_buyers">All Buyers</Link>,
      icon: 'pi pi-fw pi-users',
    },
    {
      label: <Link to="/dashboard/reported_items">Reported Items</Link>,
      icon: 'pi pi-fw pi-users',
    },
  ];

  const buyerDashboard = [
    {
      label: <Link to="/dashboard/my_orders">My Orders</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
  ];
  const sellerDashboard = [
    {
      label: <Link to="/dashboard/add_product">Add Product</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
    {
      label: <Link to="/dashboard/my_product">My Products</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
    {
      label: <Link to="/dashboard/my_buyer">My Buyers</Link>,
      icon: 'pi pi-fw pi-shopping-bag',
    },
  ];
  const [dashboardItems, setDashboardItems] = useState(sellerDashboard);
  return (
    <section className="">
      <Navbar></Navbar>
      <div className="card w-11/12 mx-auto mt-6">
        <TabMenu
          model={dashboardItems}
          activeIndex={activeIndex}
          onTabChange={e => setActiveIndex(e.index)}
        />
        <Outlet></Outlet>
      </div>
      <div></div>
    </section>
  );
};

export default DashboardLayout;
