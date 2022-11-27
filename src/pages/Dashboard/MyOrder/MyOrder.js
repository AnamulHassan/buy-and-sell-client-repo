import React from 'react';
import useTitle from '../../../hook/useTitle';

const MyOrder = () => {
  useTitle('Pay&Buy My Order');
  return (
    <div
      data-aos="zoom-out"
      className="w-full h-screen flex items-center justify-center"
    >
      <h3 className="text-3xl font-bold">My Order</h3>
    </div>
  );
};

export default MyOrder;
