import React from 'react';
import useTitle from '../../../hook/useTitle';

const ReportedItems = () => {
  useTitle('Pay&Buy Report Items');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">Reported Items</h3>
    </div>
  );
};

export default ReportedItems;
