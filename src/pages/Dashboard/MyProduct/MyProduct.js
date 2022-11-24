import React from 'react';
import useTitle from '../../../hook/useTitle';

const MyProduct = () => {
  useTitle('Pay&Buy My Product');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">My Product</h3>
    </div>
  );
};

export default MyProduct;
