import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoaderPrimary from '../components/LoaderPrimary/LoaderPrimary';

import { AuthContext } from '../context/UserContext';
const SellerRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  if (loading || isSellerLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  if (user?.uid && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
