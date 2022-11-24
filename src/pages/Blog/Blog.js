import React from 'react';
import useTitle from '../../hook/useTitle';

const Blog = () => {
  useTitle('Pay&Buy Blog');
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h3 className="text-3xl font-bold">Blog</h3>
    </div>
  );
};

export default Blog;
