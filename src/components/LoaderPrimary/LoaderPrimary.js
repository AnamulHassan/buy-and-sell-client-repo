import React from 'react';
import { Puff } from 'react-loader-spinner';

const LoaderPrimary = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#aa6f35"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoaderPrimary;
