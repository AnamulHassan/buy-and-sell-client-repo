import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  return (
    <button className="flex w-full items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r font-semibold text-white duration-300 from-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]">
      <FcGoogle className="text-3xl" />{' '}
      <span className="ml-2">Login with Google</span>
    </button>
  );
};

export default SocialLogin;
