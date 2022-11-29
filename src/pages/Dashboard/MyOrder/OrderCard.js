import React from 'react';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';

const OrderCard = ({ index, order, toast, refetch }) => {
  const { productImg, productName, productPrice, _id, isPaid, productId } =
    order;
  const { user } = useContext(AuthContext);

  // Cancel Booking
  const handleCancelBooking = orderData => {
    // setBooking(orderData);
    confirmDialog({
      message: 'Do you want to cancel this booking?',
      header: 'Booking Cancel Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-outlined p-button-danger',
      rejectClassName: 'p-button-outlined p-button-info',
      accept: () => accept(orderData),
      reject,
    });
  };
  const accept = booking => {
    const bookingInfo = {
      bookingId: booking._id,
      productID: booking.productId,
    };
    fetch(
      `https://pay-and-buy-server-anamulhassan.vercel.app/bookingCancel?email=${user?.email}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('P&B-token')
          )}`,
        },
        body: JSON.stringify(bookingInfo),
      }
    )
      .then(res => res.json())
      .then(result => {
        if (
          result?.bookingResult?.deletedCount > 0 &&
          result?.productResult?.modifiedCount > 0
        ) {
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

  return (
    <tr
      key={order._id}
      className="border-b text-md font-semibold border-opacity-20 text-[#1f1713] text-left"
    >
      <td className="py-3 px-2 text-center">
        <p>{index + 1}</p>
      </td>
      <td className="py-3 px-2 text-center">
        <Image
          src={productImg ? productImg : 'Not found'}
          zoomSrc={productImg ? productImg : 'Not found'}
          alt="Image"
          width="64"
          height="64"
          preview
        />
      </td>
      <td className="py-3 px-2 text-center">
        <p className="font-semibold text-md">
          {productName ? productName : 'Name not found'}
        </p>
      </td>
      <td className="py-3 px-2 text-center">
        <p className="font-semibold text-md">
          {productPrice ? `$ ${productPrice}` : 'Price not found'}
        </p>
      </td>
      <td className="py-3 px-2 text-center">
        {isPaid ? (
          <span className="w-full border-2 border-[#c5a07e]  text-[14px] rounded-[4px] text-[#1f1713] px-1 mt-3 py-[4.5px]  select-none block ">
            Paid
          </span>
        ) : (
          <Link
            to={`/dashboard/payment/${_id}`}
            className="w-full bg-gradient-to-r
    from-[#af8071] mt-3 to-[#c5a07e]  text-[14px] rounded-[4px] px-1 py-[6px] text-white duration-300 block hover:text-[#d3d2cf]"
          >
            Pay
          </Link>
        )}
      </td>
      <td className="py-3 px-2 text-center">
        {' '}
        <Button
          disabled={isPaid === true}
          className="btn-gradient-red"
          onClick={() => handleCancelBooking({ productId, _id })}
          label="Cancel Booking"
        ></Button>
      </td>
    </tr>
  );
};

export default OrderCard;
