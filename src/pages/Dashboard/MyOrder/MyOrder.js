import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';
import { Image } from 'primereact/image';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Dialog } from 'primereact/dialog';

const MyOrder = () => {
  useTitle('Pay&Buy My Order');
  const toast = useRef(null);
  const [id, setId] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransactionID] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useContext(AuthContext);
  const {
    data: ordersData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myOrders?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem('P&B-token')
            )}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const { price, patientName, email, _id } = ordersData[0];

  // Cancel Booking
  const handleCancelBooking = id => {
    setId(id);
    console.log(id);
    confirmDialog({
      message: 'Do you want to cancel this booking?',
      header: 'Booking Cancel Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-outlined p-button-danger',
      rejectClassName: 'p-button-outlined p-button-info',
      accept,
      reject,
    });
  };
  const accept = () => {
    fetch(`http://localhost:5000/-----//${id}?email=${user?.email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem('P&B-token')
        )}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result?.deletedCount > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Booking had been canceled',
            life: 3000,
          });
          refetch();
        }
      })
      .catch(error =>
        toast.current.show({
          severity: 'error',
          summary: 'Cancel',
          detail: error.message,
          life: 3000,
        })
      );
  };
  const reject = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Cancel',
      detail: 'You have canceled this process',
      life: 3000,
    });
  };
  // Payment
  const dialogFuncMap = {
    bookingModal: setPaymentModal,
  };
  console.log(ordersData);
  const handlePayment = (name, bookingId, productId) => {
    dialogFuncMap[`${name}`](true);
    console.log(bookingId, productId);
  };
  const onHide = (name, confirm) => {
    dialogFuncMap[`${name}`](false);

    if (confirm) {
      console.log('yes');
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem('access-token')
        )}`,
      },
      body: JSON.stringify({ price }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [price]);
  // Stript payment
  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
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
            email: email,
            name: patientName,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        name: patientName,
        email: email,
        transactionId: paymentIntent.id,
        paymentId: _id,
        price,
      };
      fetch('http://localhost:5000/payment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('access-token')
          )}`,
        },
        body: JSON.stringify(paymentInfo),
      })
        .then(res => res.json())
        .then(data => {
          if (
            data?.paymentResult?.acknowledged &&
            data?.bookingResult?.modifiedCount > 0
          ) {
            setSuccess('Payment Successful');
            setTransactionID(paymentIntent.id);
            setProcessing(false);
            navigate('/dashboard/my_appointment');
          }
        });
    }
  };

  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  return (
    <section data-aos="zoom-out">
      {ordersData?.length > 0 ? (
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl text-[#82441b] font-bold text-[] leading-tight">
            Your Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className=" bg-gradient-to-r font-semibold text-white from-[#af8071] to-[#c5a07e]">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center">Index</th>
                  <th className="py-3 px-2 text-center">Image</th>
                  <th className="py-3 px-2 text-center">Product Title</th>
                  <th className="py-3 px-2 text-center">Product Price</th>
                  <th className="py-3 px-2 text-center">Payment</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {ordersData?.length > 0 &&
                  ordersData.map((order, index) => (
                    <tr
                      key={order._id}
                      className="border-b text-md font-semibold border-opacity-20 text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Image
                          src={
                            order?.productImg ? order?.productImg : 'Not found'
                          }
                          zoomSrc={
                            order?.productImg ? order?.productImg : 'Not found'
                          }
                          alt="Image"
                          width="64"
                          height="64"
                          preview
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="font-semibold text-md">
                          {order?.productName
                            ? order?.productName
                            : 'Name not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="font-semibold text-md">
                          {order?.productPrice
                            ? `$ ${order?.productPrice}`
                            : 'Price not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Button
                          label="Pay Now"
                          onClick={() =>
                            handlePayment(
                              'bookingModal',
                              order?._id,
                              order?.productId
                            )
                          }
                          className="btn-gradient"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        {' '}
                        <Button
                          className="btn-gradient-red"
                          onClick={() => handleCancelBooking(order.productId)}
                          label="Cancel Booking"
                        ></Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <div>
                <Toast ref={toast} />

                <div className="card">
                  <ConfirmDialog />
                </div>
              </div>
            </table>
            <Dialog
              header="Payment Information"
              visible={paymentModal}
              className="w-11/12 lg:w-1/2"
              onHide={() => onHide('bookingModal')}
            >
              <form onSubmit={handleSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
                <button
                  className="btn btn-primary btn-sm px-4 mt-8 text-lg font-semibold text-white"
                  type="submit"
                  disabled={!stripe || !clientSecret || processing}
                >
                  Pay
                </button>
              </form>
            </Dialog>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center mt-16 text-[#7a7977] text-2xl font-semibold ">
            Your din't have any order
          </h2>
        </div>
      )}
    </section>
  );
};

export default MyOrder;
