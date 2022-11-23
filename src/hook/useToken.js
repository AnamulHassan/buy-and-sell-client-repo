import { useEffect, useState } from 'react';

const useToken = email => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(res => res.json())
        .then(result => {
          if (result.accessToken) {
            localStorage.setItem(
              'access-token',
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