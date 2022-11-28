import React from 'react';
import useTitle from '../../../hook/useTitle';

const MyBuyer = () => {
  useTitle('Pay&Buy My Buyer');
  const buyers = [];
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
                  <th className="py-3 px-2 text-center">Image</th>
                  <th className="py-3 px-2 text-center">Product Name</th>
                  <th className="py-3 px-2 text-center">Asking Price</th>
                  <th className="py-3 px-2 text-center">Post Date</th>
                  <th className="py-3 px-2 text-center">Post Time</th>
                  <th className="py-3 px-2 text-center">Payment</th>
                  <th className="py-3 px-2 text-center">Advertisement</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {buyers?.length > 0 &&
                  buyers.map((buyer, index) => (
                    <tr
                      key={buyer._id}
                      className="border-b border-opacity-20 font-semibold text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
                      <td className="py-3 px-2 text-center"></td>
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
