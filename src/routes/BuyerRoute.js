import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import LoaderPrimary from '../components/LoaderPrimary/LoaderPrimary';
import useBuyer from '../hook/useBuyer';
const BuyerRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  if (loading || isBuyerLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  if (user?.uid && isBuyer) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
