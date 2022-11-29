import { useEffect, useState } from 'react';

const useToken = email => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (email) {
      fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/jwt?email=${email}`
      )
        .then(res => res.json())
        .then(result => {
          if (result.accessToken) {
            localStorage.setItem(
              'P&B-token',
              JSON.stringify(result.accessToken)
            );
            setToken(result.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};
export default useToken;
