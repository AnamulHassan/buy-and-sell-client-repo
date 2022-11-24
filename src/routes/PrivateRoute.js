import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoaderPrimary from '../components/LoaderPrimary/LoaderPrimary';
import { AuthContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  if (user?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
