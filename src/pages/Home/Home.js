import React from 'react';
import useTitle from '../../hook/useTitle';
import Advertisement from './Advertisement/Advertisement';
import HowItWorks from './HowItWorks/HowItWorks';
import ProductCategory from './ProductCategory/ProductCategory';
import Slider from './Slider/Slider';

const Home = () => {
  useTitle('Pay&Buy Home');
  return (
    <section>
      <div className="w-screen mx-auto">
        <Slider></Slider>
      </div>
      <div className="w-10/12 mx-auto">
        <ProductCategory></ProductCategory>
      </div>
      <div className="w-10/12 mx-auto">
        <Advertisement></Advertisement>
      </div>
      <div className="w-10/12 mx-auto">
        <HowItWorks></HowItWorks>
      </div>
    </section>
  );
};

export default Home;
