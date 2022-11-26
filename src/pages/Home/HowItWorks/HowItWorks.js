import React from 'react';
import community from '../../../asset/images/how-it-works/Community.png';
import verify from '../../../asset/images/how-it-works/verify.png';
import buyOrSell from '../../../asset/images/how-it-works/buy-or-sell.png';

const HowItWorks = () => {
  return (
    <section>
      <h2 className="text-center font-bold text-4xl mt-6 mb-10 text-[#7a7977]">
        How it Works
      </h2>
      <div className="w-full items-center lg:items-start flex flex-col lg:flex-row lg:space-x-3">
        <div className="w-11/12 lg:w-2/6">
          <img className="" src={community} alt="" />
          <div className="text-center mt-4 lg:mt-0 px-4 select-none">
            <span className="inline-block px-4 border-2 rounded-full border-[#c5a07e] py-[1px] my-2 text-2xl font-semibold text-[#af8071] bg-[#e8eceb]">
              Step 1
            </span>
            <h2 className="text-[#7a7977] text-xl font-bold">
              Find Your Local Community
            </h2>
            <p className="my-2 text-[#7a7977] font-semibold">
              Enter your location and join a community in the same places you
              live, work and play.
            </p>
          </div>
        </div>
        <div className="w-11/12 lg:w-2/6  mt-4 lg:mt-0">
          <img className="" src={verify} alt="" />
          <div className="text-center mt-4 lg:mt-0 px-4 select-none">
            <span className="inline-block px-4 border-2 rounded-full border-[#c5a07e] py-[1px] my-2 text-2xl font-semibold text-[#af8071] bg-[#e8eceb]">
              Step 2
            </span>
            <h2 className="text-[#7a7977] text-xl font-bold">Get verified</h2>
            <p className="my-2 text-[#7a7977] font-semibold">
              Connect with Facebook to confirm who you are. An admin will review
              your request for approval.
            </p>
          </div>
        </div>
        <div className="w-11/12 lg:w-2/6  mt-4 lg:mt-0">
          <img className="" src={buyOrSell} alt="" />
          <div className="text-center mt-4 lg:mt-0 px-4 select-none">
            <span className="inline-block px-4 border-2 rounded-full border-[#c5a07e] py-[1px] my-2 text-2xl font-semibold text-[#af8071] bg-[#e8eceb]">
              Step 3
            </span>
            <h2 className="text-[#7a7977] text-xl font-bold">
              Buy and Sell safely
            </h2>
            <p className="my-2 text-[#7a7977] font-semibold">
              Transact with other verified people in your neighbourhood. Sell
              stuff quickly & find amazing bargains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
