import React from 'react';
import useTitle from '../../../hook/useTitle';

const MyBuyer = () => {
  useTitle('Pay&Buy My Buyer');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">My Buyers</h3>
    </div>
  );
};

export default MyBuyer;
