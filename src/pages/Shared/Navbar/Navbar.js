import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { SlideMenu } from 'primereact/slidemenu';
import { FaAlignJustify } from 'react-icons/fa';

const Navbar = () => {
  const menu = useRef(null);

  const items = [
    {
      label: <NavLink to="/home">Home</NavLink>,
      icon: 'pi pi-fw pi-home',
    },
    {
      label: <NavLink to="/blog">Blog</NavLink>,
      icon: 'pi pi-fw pi-book',
    },
    {
      label: <NavLink to="/about">About</NavLink>,
      icon: 'pi pi-fw pi-question-circle',
    },
    {
      separator: true,
    },
    {
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      icon: 'pi pi-fw pi-chart-bar',
    },
    {
      label: <button>Logout</button>,
      icon: 'pi pi-fw pi-sign-out',
    },
  ];

  return (
    <header className="w-full bg-slate-200">
      <div className="w-11/12 mx-auto py-2 flex justify-between items-center">
        <h2>Pay&Buy</h2>
        <button
          type="button"
          icon="pi pi-bars"
          label="Show"
          onClick={event => menu.current.toggle(event)}
        >
          <FaAlignJustify />
        </button>
      </div>
      <div>
        <SlideMenu
          ref={menu}
          model={items}
          popup
          viewportHeight={220}
          menuWidth={200}
        ></SlideMenu>
      </div>
    </header>
  );
};

export default Navbar;
