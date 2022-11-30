import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderForCard = () => {
  return (
    <div className="w-full h-42 flex justify-center items-center">
      <Oval
        height={50}
        width={50}
        color="#af8071"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#c5a07e"
        strokeWidth={6}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

export default LoaderForCard;
