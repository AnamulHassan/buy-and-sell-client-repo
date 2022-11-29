import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { useLoaderData } from 'react-router-dom';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  const booking = useLoaderData();
  const { productPrice, productName } = booking;

  return (
    <section data-aos="zoom-out">
      <h2 className="text-2xl text-center font-bold mt-8 text-[#7a7977]">
        Payment for{' '}
        <span className="text-primary">
          {productName ? productName : 'Name not found'}
        </span>
      </h2>
      <div className="w-11/12 lg:w-1/2 my-4 mx-auto px-[29px]">
        <p className="text-accent text-center font-semibold mt-4">
          Please, pay{' '}
          <span className="font-bold text-[#82441b]">
            ${productPrice ? productPrice : 'Price not found'}
          </span>{' '}
          for your product{' '}
          <span className="font-bold text-[#82441b]">
            {productName ? productName : 'Name not found'}
          </span>
        </p>
        <div className="my-8">
          <Elements stripe={stripePromise}>
            <CheckOutForm booking={booking}></CheckOutForm>
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
