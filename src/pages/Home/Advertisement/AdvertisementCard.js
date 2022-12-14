import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FaHeart } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import useBuyer from '../../../hook/useBuyer';
import LoaderForCard from '../../../components/LoaderForCard/LoaderForCard';

const AdvertisementCard = ({ advertiseData, refetch, isLoading }) => {
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);
  const bookingTime = new Date().toISOString();
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const navigate = useNavigate();
  const {
    condition,
    contact,
    date,
    email,
    img,
    location,
    productName,
    name,
    resalePrice,
    purchaseYear,
    originalPrice,
    _id,
    isSellerVerification,
  } = advertiseData;

  const [bookingModal, setBookingModal] = useState(false);

  const dialogFuncMap = {
    bookingModal: setBookingModal,
  };

  const handleBooking = name => {
    dialogFuncMap[`${name}`](true);
    if (!user || !isBuyer) {
      navigate('/login');
    }
  };

  const onHide = (name, confirm) => {
    dialogFuncMap[`${name}`](false);

    if (confirm) {
      console.log('yes');
    }
  };
  const handleAddWishlist = productData => {
    if (!user || !isBuyer) {
      navigate('/login');
    } else {
      const wishlistData = {
        productTitle: productData?.productName,
        productId: productData?._id,
        productPrice: productData?.resalePrice,
        productImg: productData?.img,
        sellerEmail: productData?.email,
        buyerEmail: user?.email,
        date: bookingTime,
      };
      setLoadingWishlist(true);
      fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/wishlist?email=${user?.email}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem('P&B-token')
            )}`,
          },
          body: JSON.stringify(wishlistData),
        }
      )
        .then(res => res.json())
        .then(result => {
          if (result?.acknowledged) {
            setLoadingWishlist(false);
            toast.success('This product has been added to your wishlist', {
              style: {
                border: '2px solid #aa6f35',
                padding: '16px',
                color: '#aa6f35',
                fontWeight: '600',
              },
            });
          } else {
            toast.error(`You added this product already to your wishlist`, {
              style: {
                border: '2px solid #aa2c08',
                padding: '16px',
                color: '#aa2c08',
                fontWeight: '600',
              },
            });
          }
        })
        .catch(error => {
          toast.error(`${error.message}`, {
            style: {
              border: '2px solid #aa2c08',
              padding: '16px',
              color: '#aa2c08',
              fontWeight: '600',
            },
          });
        });
    }
  };
  const handleBookingSubmit = event => {
    event.preventDefault();
    const from = event.target;
    const buyerName = from.buyerName.value;
    const buyerEmail = from.email.value;
    const productName = from.productName.value;
    const productPrice = from.productPrice.value;
    const sellerEmail = from.sellerEmail.value;
    const sellerContact = from.sellerContact.value;
    const meetLocation = from.meetLocation.value;
    const buyerContact = from.buyerContact.value;

    const bookingInfo = {
      buyerName,
      buyerEmail,
      productName,
      productId: _id,
      productPrice,
      sellerEmail,
      sellerContact,
      meetLocation,
      buyerContact,
      productImg: img,
      bookingTime,
    };
    setLoadingBooking(true);
    fetch(
      `https://pay-and-buy-server-anamulhassan.vercel.app/booking?email=${user?.email}`,
      {
        method: 'POST',
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
          result?.bookingResult?.acknowledged &&
          result?.replacementResult?.modifiedCount > 0
        )
          refetch();
        setLoadingBooking(false);
        toast.success('Booking Submitted Successfully', {
          style: {
            border: '2px solid #aa6f35',
            padding: '16px',
            color: '#aa6f35',
            fontWeight: '600',
          },
        });
      });
  };

  if (isLoading) {
    return <LoaderForCard></LoaderForCard>;
  }
  return (
    <div
      data-aos="zoom-in-down"
      className="w-full [] border-4 p-[-2px] border-[#af8071] h-full flex flex-col justify-between "
    >
      <div className="p-2">
        <Image
          src={img}
          alt="Image"
          style={{ width: '100%', height: '100%' }}
          preview
        />
      </div>
      <div className="px-2 -mt-4 py-4">
        <h4 className="font-bold text-lg">
          {productName ? productName : 'Not found'}
        </h4>
        <ul className="font-semibold text-[#7a7977]">
          <li>
            <span>Location: </span> {location ? location : 'Not found'}
          </li>
          <li>
            <span>Resale Price: $</span>
            {resalePrice ? resalePrice : 'Not Found'}
          </li>
          <li>
            <span>Original Price: $</span>{' '}
            {originalPrice ? originalPrice : 'Not Found'}
          </li>
          <li>
            <span>Years Of Use: </span>{' '}
            {purchaseYear
              ? `${new Date().getFullYear() - +purchaseYear} ${
                  new Date().getFullYear() - +purchaseYear > 1
                    ? 'years'
                    : 'year'
                }`
              : 'Not Found'}
          </li>
          <li>
            <span>Product Condition: </span>{' '}
            {condition ? condition : 'Not Found'}
          </li>
          <li>
            <span>Posted: </span>{' '}
            {date
              ? `${new Date(date).getUTCDate()}-${new Date(
                  date
                ).getUTCMonth()}-${new Date(date).getUTCFullYear()}`
              : 'Not found'}
          </li>
          <li>
            <span>Seller Name: </span>{' '}
            {name ? (
              <span className="inline-flex items-center">
                {name}{' '}
                <span>
                  {isSellerVerification ? (
                    <HiBadgeCheck className="text-[#4a8fa8] text-xl ml-1" />
                  ) : (
                    ''
                  )}
                </span>
              </span>
            ) : (
              'Not found'
            )}
          </li>
        </ul>
        <div className="flex justify-between items-center">
          <Button
            label="Book Now"
            disabled={user && isBuyer === false}
            onClick={() => handleBooking('bookingModal', _id)}
            className="btn-gradient"
          />
          <button
            onClick={() => handleAddWishlist(advertiseData)}
            disabled={loadingWishlist || (user && isBuyer === false)}
            className="flex items-center justify-center text-[#aa2c08] px-4 py-1 mt-3 duration-300 hover:text-[#df390b]"
          >
            <FaHeart className="mr-1" />
            <span className="font-bold"> Add Wishlist</span>
          </button>
        </div>

        <Dialog
          header="Booking Information"
          visible={bookingModal}
          className="w-11/12 lg:w-1/2"
          onHide={() => onHide('bookingModal')}
        >
          <form onSubmit={handleBookingSubmit}>
            <div className="flex w-full space-x-4">
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="buyerName"
                >
                  Name
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="text"
                  name="buyerName"
                  id="buyerName"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="email"
                  name="email"
                  id="name"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="text"
                  name="productName"
                  id="productName"
                  defaultValue={productName}
                  readOnly
                />
              </div>
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="productPrice"
                >
                  Product Price
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  defaultValue={resalePrice}
                  readOnly
                />
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="sellerEmail"
                >
                  Seller Email
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="email"
                  name="sellerEmail"
                  id="sellerEmail"
                  defaultValue={email}
                  readOnly
                />
              </div>
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="sellerContact"
                >
                  Seller Contact
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="number"
                  name="sellerContact"
                  id="sellerContact"
                  defaultValue={contact}
                  readOnly
                />
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="meetLocation"
                >
                  Your Location
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="text"
                  name="meetLocation"
                  id="meetLocation"
                  placeholder="Write your location"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  className="font-semibold text-md ml-4 mb-1 inline-block select-none"
                  htmlFor="buyerContact"
                >
                  Your Contact
                </label>
                <input
                  className="block border-[1px] w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none rounded-md"
                  type="number"
                  name="buyerContact"
                  id="buyerContact"
                  placeholder="Write your contact"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <input
                disabled={loadingBooking}
                type="submit"
                value="Submit"
                className="px-4 py-1 rounded bg-gradient-to-r font-semibold cursor-pointer text-white duration-300 from-[#af8071] border-[1px] border-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]"
              />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default AdvertisementCard;
