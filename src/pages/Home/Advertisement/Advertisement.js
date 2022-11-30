import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import AdvertisementCard from './AdvertisementCard';

const Advertisement = () => {
  const {
    data: advertiseData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['advertiseData'],
    queryFn: async () => {
      const res = await fetch(
        'https://pay-and-buy-server-anamulhassan.vercel.app/advertiseProduct'
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  return (
    <section className="my-10">
      {advertiseData?.length > 0 && (
        <div>
          <h3 className="text-center text-sm text-opacity-70 -mb-2 uppercase font-bold text-[#c5a07e] tracking-tight">
            Advertisement
          </h3>
          <h2 className="text-5xl text-center font-bold text-[#82441b] tracking-tighter mb-10">
            Sell simply, Buy safely.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertiseData?.map(advertise => (
              <AdvertisementCard
                key={advertise._id}
                advertiseData={advertise}
                refetch={refetch}
                isLoading={isLoading}
              ></AdvertisementCard>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Advertisement;
