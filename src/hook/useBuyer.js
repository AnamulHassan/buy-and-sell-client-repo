import { useEffect, useState } from 'react';

const useBuyer = email => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/buyer/${email}`)
        .then(res => res.json())
        .then(result => {
          setIsBuyer(result?.isBuyer);
          setIsBuyerLoading(false);
        });
    }
  }, [email]);
  return [isBuyer, isBuyerLoading];
};
export default useBuyer;
