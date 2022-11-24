import React from 'react';
import useTitle from '../../hook/useTitle';

const About = () => {
  useTitle('Pay&Buy About');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">About</h3>
    </div>
  );
};

export default About;
