import React from 'react';
import useTitle from '../../hook/useTitle';

const Home = () => {
  useTitle('Pay&Buy Home');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">Home hooo</h3>
    </div>
  );
};

export default Home;
