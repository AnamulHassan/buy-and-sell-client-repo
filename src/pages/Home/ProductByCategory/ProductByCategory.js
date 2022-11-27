import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import { AuthContext } from '../../../context/UserContext';
import AdvertisementCard from '../Advertisement/AdvertisementCard';

const ProductByCategory = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const categoryPath = location?.pathname.split('/')[2];
  const {
    data: productsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['productsData', categoryPath],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?path=${categoryPath}&email=${user?.email}`,
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
  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  return (
    <section className="w-11/12 lg:w-10/12 mx-auto my-12">
      {productsData?.length > 0 ? (
        <div>
          <h2 className="font-bold text-lg lg:text-3xl uppercase text-[#82441b] flex items-end mb-6">
            <span>Shop By Category</span>{' '}
            <FaAngleDoubleRight className="mx-2 text-[#c5a07e] text-2xl lg:text-[34px]" />
            <span className="text-sm lg:text-xl font-semibold">
              {productsData[0].category
                ? productsData[0].category
                : 'Category Not Found'}
            </span>{' '}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData?.map(advertise => (
              <AdvertisementCard
                key={advertise._id}
                advertiseData={advertise}
                refetch={refetch}
              ></AdvertisementCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h2 className="font-semibold text-2xl text-[#af8071]">
            There is no product in this category
          </h2>
        </div>
      )}
    </section>
  );
};

export default ProductByCategory;
