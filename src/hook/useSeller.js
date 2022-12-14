import { useEffect, useState } from 'react';

const useSeller = email => {
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/user/seller/${email}`
      )
        .then(res => res.json())
        .then(result => {
          setIsSeller(result?.isSeller);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, isSellerLoading];
};
export default useSeller;
