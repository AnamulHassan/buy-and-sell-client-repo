import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useContext } from 'react';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import OrderCard from './OrderCard';

const MyOrder = () => {
  useTitle('Pay&Buy My Order');
  const { user } = useContext(AuthContext);
  const toast = useRef(null);

  const {
    data: ordersData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/myOrders?email=${user?.email}`,
        {
          headers: {
            'content-type': 'application/json',
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

  // Payment

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
                    <OrderCard
                      toast={toast}
                      key={index}
                      index={index}
                      order={order}
                      refetch={refetch}
                    ></OrderCard>
                  ))}
              </tbody>
            </table>
            <Toast ref={toast} />
            <div className="card">
              <ConfirmDialog />
            </div>
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
