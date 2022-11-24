import React from 'react';
import useTitle from '../../../hook/useTitle';

const AddProduct = () => {
  useTitle('Pay&Buy Add Product');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">Add A Product</h3>
    </div>
  );
};

export default AddProduct;
