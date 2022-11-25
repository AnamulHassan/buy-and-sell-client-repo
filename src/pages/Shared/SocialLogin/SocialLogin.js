import React from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';
import toast from 'react-hot-toast';

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { setUser, loginWithGoogle, setLoading } = useContext(AuthContext);
  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(result => {
        const user = result?.user;
        const userInfo = {
          name: user.name,
          email: user.email,
          isBuyer: true,
          isSeller: false,
        };

        setUser(user);
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch(error => console.error(error));
  };
  const userInfoUpdateToDB = (userData, userInfo) => {
    fetch('http://localhost:5000/users', {
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
          toast.success(`Welcome back, ${userInfo.displayName}`);
        }
      })
      .catch(error => toast.error(error.message));
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
