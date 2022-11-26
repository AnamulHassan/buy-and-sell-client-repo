import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import AdvertisementCard from './AdvertisementCard';

const Advertisement = () => {
  const { data: advertiseData = [], isLoading } = useQuery({
    queryKey: ['advertiseData'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/advertiseProduct');
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
          <h2 className="text-5xl text-center font-bold text-[#82441b] tracking-tighter mb-10">
            Sell simply, Buy safely.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertiseData?.map(advertise => (
              <AdvertisementCard
                key={advertise._id}
                advertiseData={advertise}
              ></AdvertisementCard>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Advertisement;
