import React, { useEffect, useState } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import toast from 'react-hot-toast';

const CheckOutForm = ({ booking }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransactionID] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const paymentTime = new Date().toISOString();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const {
    productPrice,
    buyerName,
    buyerEmail,
    _id,
    productId,
    sellerEmail,
    productName,
  } = booking;
  const price = +productPrice;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'https://pay-and-buy-server-anamulhassan.vercel.app/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('P&B-token')
          )}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError('');
    }
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: buyerEmail,
            name: buyerName,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        buyerName,
        buyerEmail,
        transactionId: paymentIntent.id,
        paymentId: _id,
        productId,
        sellerEmail,
        price,
        productName,
        paymentTime,
      };
      fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/payment?email=${user?.email}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem('P&B-token')
            )}`,
          },
          body: JSON.stringify(paymentInfo),
        }
      )
        .then(res => res.json())
        .then(data => {
          if (
            data?.bookingResult?.modifiedCount > 0 &&
            data?.paymentResult?.acknowledged &&
            data?.productResult?.modifiedCount > 0
          ) {
            setSuccess('Payment Successful');
            setTransactionID(paymentIntent.id);
            setProcessing(false);
            toast.success('Payment Successful', {
              style: {
                border: '2px solid #aa6f35',
                padding: '16px',
                color: '#aa6f35',
                fontWeight: '600',
              },
            });
            navigate('/dashboard/my_orders');
          }
        });
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="my-8">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1f1713',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#aa2c08',
                },
              },
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-6 py-1 rounded text-xl bg-gradient-to-r font-semibold cursor-pointer text-white duration-300 from-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      <p>
        {cardError && (
          <span className="text-[#aa2c08] font-semibold">{cardError}</span>
        )}
      </p>
      <div className="text-center">
        {success && (
          <div className="my-6 text-lg font-semibold mt-6 border-4 border-[#af8071] py-6 px-2 rounded-lg bg-[#e8eceb]">
            <p className="text-2xl mb-2 font-bold text-[#1f1713]">
              Payment Information
            </p>
            <p>
              Payment Status: <span className="text-green-500">{success}</span>
            </p>
            <p>Transaction ID: {transactionID}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckOutForm;
