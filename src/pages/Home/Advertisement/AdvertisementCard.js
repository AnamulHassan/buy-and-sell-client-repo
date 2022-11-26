import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AdvertisementCard = ({ advertiseData }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    condition,
    contact,
    date,
    description,
    email,
    img,
    location,
    productName,
    name,
    resalePrice,
    purchaseYear,
    originalPrice,
    _id,
  } = advertiseData;

  const [bookingModal, setBookingModal] = useState(false);

  const dialogFuncMap = {
    bookingModal: setBookingModal,
  };

  const handleBooking = name => {
    dialogFuncMap[`${name}`](true);
    if (!user) {
      navigate('/login');
    }
  };

  const onHide = (name, confirm) => {
    dialogFuncMap[`${name}`](false);

    if (confirm) {
      console.log('yes');
    }
  };
  const renderFooter = name => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="btn-gradient-delete"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name, true)}
          autoFocus
          className="btn-gradient"
        />
      </div>
    );
  };

  return (
    <div className="w-full [] border-4 p-[-2px] border-[#af8071] h-full flex flex-col justify-between ">
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
            <span>Years of use: </span>{' '}
            {purchaseYear
              ? `${new Date().getFullYear() - +purchaseYear} ${
                  new Date().getFullYear() - +purchaseYear > 1
                    ? 'years'
                    : 'year'
                }`
              : 'Not Found'}
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
            <span>Seller Name: </span> {name ? name : 'Not found'}
          </li>
        </ul>
        <Button
          label="Book Now"
          onClick={() => handleBooking('bookingModal', _id)}
          className="btn-gradient"
        />
        <Dialog
          header="Booking Information"
          visible={bookingModal}
          style={{ width: '50vw' }}
          footer={renderFooter('bookingModal')}
          onHide={() => onHide('bookingModal')}
        >
          <form
            action="
          "
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="block border-2 w-full px-4 font-semibold text-[#a2a7a5] py-2 focus:outline-none"
                type="text"
                name="name"
                id="name"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default AdvertisementCard;
