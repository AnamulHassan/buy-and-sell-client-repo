import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderSecondary = () => {
  return (
    <Oval
      height={25}
      width={25}
      color="#d3d2cf"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#e8eceb"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default LoaderSecondary;
