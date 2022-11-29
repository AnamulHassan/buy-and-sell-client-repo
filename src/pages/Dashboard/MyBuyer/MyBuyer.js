import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';

const MyBuyer = () => {
  useTitle('Pay&Buy My Buyer');
  const { user } = useContext(AuthContext);
  const [buyers, setBuyers] = useState([]);

  const url = `https://pay-and-buy-server-anamulhassan.vercel.app/sellerSBuyer?email=${user?.email}`;
  useEffect(() => {
    axios.get(url).then(response => {
      setBuyers(response.data);
    });
  }, [url]);
  return (
    <section data-aos="zoom-out">
      {buyers?.length > 0 ? (
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl text-[#82441b] font-bold text-[] leading-tight">
            Your Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className=" bg-gradient-to-r font-semibold text-white from-[#af8071] to-[#c5a07e]">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center">Index</th>
                  <th className="py-3 px-2 text-center">Buyer Name</th>
                  <th className="py-3 px-2 text-center">Buyer Email</th>
                  <th className="py-3 px-2 text-center">Product Name</th>
                  <th className="py-3 px-2 text-center">Product Price</th>
                  <th className="py-3 px-2 text-center">Payment Date</th>
                  <th className="py-3 px-2 text-center">
                    Payment Transaction Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {buyers?.length > 0 &&
                  buyers.map((buyer, index) => (
                    <tr
                      key={buyer._id}
                      className="border-b border-opacity-20 font-semibold text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center">{index + 1}</td>
                      <td className="py-3 px-2 text-center">
                        {buyer?.buyerName ? buyer?.buyerName : 'Name not found'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {buyer?.buyerEmail
                          ? buyer?.buyerEmail
                          : 'Email not found'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {buyer?.productName
                          ? buyer?.productName
                          : 'Product name not found'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {buyer?.price ? `$ ${buyer?.price}` : 'Price not found'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {buyer?.paymentTime
                          ? `${new Date(
                              buyer?.paymentTime
                            ).getDate()}-${new Date(
                              buyer?.paymentTime
                            ).getMonth()}-${new Date(
                              buyer?.paymentTime
                            ).getFullYear()}`
                          : 'Date not found'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {' '}
                        {buyer?.transactionId
                          ? buyer?.transactionId
                          : 'Transaction id not found'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center mt-16 text-[#7a7977] text-2xl font-semibold ">
            Your din't have any buyer
          </h2>
        </div>
      )}
    </section>
  );
};

export default MyBuyer;
