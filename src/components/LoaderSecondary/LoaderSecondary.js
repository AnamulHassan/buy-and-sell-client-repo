import React from 'react';
import { RevolvingDot } from 'react-loader-spinner';

const LoaderSecondary = () => {
  return (
    <RevolvingDot
      height="200"
      width="200"
      radius="6"
      color="#e8eceb"
      secondaryColor=""
      ariaLabel="revolving-dot-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderSecondary;
