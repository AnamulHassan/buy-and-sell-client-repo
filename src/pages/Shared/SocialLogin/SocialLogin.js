import React from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { setUser, loginWithGoogle, setLoading } = useContext(AuthContext);
  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(result => {
        setUser(result.user);
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch(error => console.error(error));
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
