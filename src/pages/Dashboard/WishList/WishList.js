import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';

const WishList = () => {
  useTitle('Pay&Buy WishList');
  const { user } = useContext(AuthContext);
  const { data: wishlistData = [] } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/wishlist?email=${user?.email}`,
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
  return (
    <section data-aos="zoom-out">
      {wishlistData?.length > 0 ? (
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl text-[#82441b] font-bold text-[] leading-tight">
            Your Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className=" bg-gradient-to-r font-semibold text-white from-[#af8071] to-[#c5a07e]">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center">Index</th>
                  <th className="py-3 px-2 text-center">Product Image</th>
                  <th className="py-3 px-2 text-center">Product Title</th>
                  <th className="py-3 px-2 text-center">Product Price</th>
                  <th className="py-3 px-2 text-center">Seller Email</th>
                  <th className="py-3 px-2 text-center">Payment</th>
                </tr>
              </thead>
              <tbody>
                {wishlistData.length > 0 &&
                  wishlistData.map((wishlist, index) => (
                    <tr
                      key={wishlist._id}
                      className="border-b text-md font-semibold border-opacity-20 text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Image
                          src={
                            wishlist.productImg
                              ? wishlist.productImg
                              : 'Not found'
                          }
                          zoomSrc={
                            wishlist.productImg
                              ? wishlist.productImg
                              : 'Not found'
                          }
                          alt="Image"
                          width="64"
                          height="64"
                          preview
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="font-semibold text-md">
                          {wishlist.productTitle
                            ? wishlist.productTitle
                            : 'Name not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="font-semibold text-md">
                          {wishlist?.productPrice
                            ? `$ ${wishlist?.productPrice}`
                            : 'Price not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="font-semibold text-md">
                          {wishlist?.sellerEmail
                            ? `${wishlist?.sellerEmail}`
                            : 'Email not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {wishlist?.isSold ? (
                          <span className="w-full border-2 border-[#c5a07e]  text-[14px] rounded-[4px] text-[#1f1713] px-1 mt-3 py-[4.5px]  select-none block ">
                            Paid
                          </span>
                        ) : (
                          <Link
                            to={`/dashboard/payment/${wishlist?.productId}`}
                            className="w-full bg-gradient-to-r
                from-[#af8071] mt-3 to-[#c5a07e]  text-[14px] rounded-[4px] px-1 py-[6px] text-white duration-300 block hover:text-[#d3d2cf]"
                          >
                            Pay
                          </Link>
                        )}
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
            Your din't have any wishlist item.
          </h2>
        </div>
      )}
    </section>
  );
};

export default WishList;
