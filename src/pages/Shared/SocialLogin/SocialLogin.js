import React, { useState } from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';
import toast from 'react-hot-toast';
import useToken from '../../../hook/useToken';

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { setUser, loginWithGoogle, setLoading } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');
  const [token] = useToken(userEmail);
  const date = new Date().toISOString();
  if (token) {
    navigate(from, { replace: true });
  }
  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(result => {
        const user = result?.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          isBuyer: true,
          isSeller: false,
          date,
        };

        userInfoUpdateToDB(userInfo, user);
        setUserEmail(user?.email);
      })
      .catch(error => console.error(error));
  };
  const userInfoUpdateToDB = (userData, userInfo) => {
    fetch('https://pay-and-buy-server-anamulhassan.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          setUser(userInfo);

          setLoading(false);
          navigate(from, { replace: true });
          toast.success(`Welcome back, ${userInfo?.displayName}`, {
            style: {
              border: '2px solid #aa6f35',
              padding: '16px',
              color: '#aa6f35',
              fontWeight: '600',
            },
          });
        }
      })
      .catch(error =>
        toast.error(`${error.message}`, {
          style: {
            border: '2px solid #aa2c08',
            padding: '16px',
            color: '#aa2c08',
            fontWeight: '600',
          },
        })
      );
  };
  return (
    <button
      onClick={handleLoginWithGoogle}
      className="flex w-full items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r font-semibold text-white duration-300 from-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]"
    >
      <FcGoogle className="text-3xl" />{' '}
      <span className="ml-2">Login with Google</span>
    </button>
  );
};

export default SocialLogin;
