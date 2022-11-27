import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import errorImg from '../../asset/images/error/error.png';

const ErrorPage = () => {
  const errorMessage = useRouteError();
  return (
    <div className="w-11/12  mx-auto h-screen flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full lg:w-1/2 flex items-center justify-end ">
        <img className="w-full h-full" src={errorImg} alt="" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-start flex-col mt-6 lg:mt-0 ">
        <h2 className="text-5xl lg:text-8xl tracking-tight text-[#82441b] font-bold mb-6 lg:mb-12 font-mono">
          Oops!...
        </h2>
        <h2 className="font-bold text-3xl lg:text-5xl text-[#aa2c08]">
          {errorMessage?.status ? (
            errorMessage?.status
          ) : (
            <span className="text-3xl font-mono">Something went wrong</span>
          )}
        </h2>
        <h3 className="font-bold text-xl text-[#7a7977] mt-1 lg:mt-2">
          {' '}
          {errorMessage?.statusText
            ? errorMessage?.statusText
            : 'Status not found'}
        </h3>
        <Link
          to="/home"
          className="px-4 py-1 rounded bg-gradient-to-r font-semibold cursor-pointer text-white duration-300 from-[#af8071] border-[1px] border-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf] mt-4 text-xl"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
