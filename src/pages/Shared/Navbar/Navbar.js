import React, { useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SlideMenu } from 'primereact/slidemenu';
import { FaBars } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import LoaderSecondary from '../../../components/LoaderSecondary/LoaderSecondary';
import logo from '../../../asset/images/logo.png';

const Navbar = () => {
  const menu = useRef(null);
  const navigate = useNavigate();
  const { user, loading, userLogout } = useContext(AuthContext);
  const handleLogout = () => {
    userLogout()
      .then(() => {
        localStorage.removeItem('P&B-token');
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  const items = [
    {
      label: (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-[#aa6f35] font-bold ' : 'font-bold duration-300'
          }
          to="/home"
        >
          Home
        </NavLink>
      ),
      icon: 'pi pi-fw pi-home',
    },
    {
      label: (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-[#aa6f35] font-bold ' : 'font-bold duration-300'
          }
          to="/blog"
        >
          Blog
        </NavLink>
      ),
      icon: 'pi pi-fw pi-book',
    },
    {
      label: (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-[#aa6f35] font-bold ' : 'font-bold duration-300'
          }
          to="/about"
        >
          About
        </NavLink>
      ),
      icon: 'pi pi-fw pi-question-circle',
    },
    {
      label: (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-[#aa6f35] font-bold ' : 'font-bold duration-300'
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      ),
      icon: 'pi pi-fw pi-chart-bar',
    },
    {
      label: (
        <button
          onClick={handleLogout}
          className="hover:text-[#aa6f35] font-bold duration-300"
        >
          Logout
        </button>
      ),
      icon: 'pi pi-fw pi-sign-out',
    },
  ];

  return (
    <header
      data-aos="fade-down"
      className="w-full bg-gradient-to-r
    from-[#af8071] to-[#c5a07e] text-[#e8eceb]"
    >
      <div className="w-10/12 mx-auto py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl">
          <img className="w-32 lg:w-36" src={logo} alt="" />
        </Link>
        <div className="flex justify-between items-center">
          {user ? (
            ''
          ) : loading ? (
            <LoaderSecondary></LoaderSecondary>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 rounded bg-gradient-to-r font-semibold cursor-pointer text-white duration-300 to-[#af8071] from-[#c5a07e] hover:text-[#d3d2cf]"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            icon="pi pi-bars"
            label="Show"
            onClick={event => menu.current.toggle(event)}
          >
            <span className=" duration-300 hover:bg-[#c5a07e] h-10 w-10 rounded-full flex justify-center items-center">
              {' '}
              <FaBars />
            </span>
          </button>
        </div>
      </div>
      <div>
        <SlideMenu
          ref={menu}
          model={user ? items : items.slice(0, -1)}
          popup
          viewportHeight={220}
          menuWidth={200}
        ></SlideMenu>
      </div>
    </header>
  );
};

export default Navbar;
