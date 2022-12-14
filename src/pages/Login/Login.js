import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hook/useTitle';
import toast from 'react-hot-toast';
import useToken from '../../hook/useToken';

const Login = () => {
  useTitle('Pay&Buy Login');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { setUser, loginWithEmailAndPassword, setLoading, loading } =
    useContext(AuthContext);
  const [showError, setShowError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token] = useToken(userEmail);
  if (token) {
    navigate(from, { replace: true });
  }
  const defaultValues = {
    email: '',
    password: '',
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const handleLoginUser = data => {
    loginWithEmailAndPassword(data.email, data.password)
      .then(result => {
        setUser(result.user);
        setUserEmail(result?.user?.email);
        setLoading(false);
        reset();
        toast.success(`Welcome back, ${result?.user?.displayName}`, {
          style: {
            border: '2px solid #aa6f35',
            padding: '16px',
            color: '#aa6f35',
            fontWeight: '600',
          },
        });
      })
      .catch(error => {
        setLoading(false);
        if (error.message.includes('auth/user-not-found')) {
          setShowError('this account not exist.');
        } else if (error.message.includes('auth/wrong-password')) {
          setShowError("email and password didn't match");
        } else {
          setShowError(error.message);
        }
      });
  };

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div data-aos="zoom-in" className="w-10/12 mt-12 mb-20 mx-auto">
      <div className="mx-auto flex justify-content-center">
        <div className="w-11/12 lg:w-2/5 mx-auto">
          <h5 className="text-center mt-12 mb-6 text-3xl font-bold tracking-tight text-[]">
            Login
          </h5>
          <form
            onSubmit={handleSubmit(handleLoginUser)}
            className="p-fluid space-y-6 outline-[#aa6f35] ring-[#aa6f35]"
          >
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address. E.g. example@email.com',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ 'p-error': !!errors.email })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="field">
              <span className="p-float-label ">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      required
                      toggleMask
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ 'p-error': errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <Button
              disabled={loading}
              type="submit"
              label="Login"
              className="btn-primary"
            />
          </form>
          {showError && (
            <p className="text-center -mb-5 text-sm font-semibold text-[#aa2c08]">
              {showError}
            </p>
          )}
          <div className="w-full mt-6">
            <SocialLogin></SocialLogin>
            <p className="text-center font-semibold my-2 text-[#a2a7a5]">
              Do you create a new one?{' '}
              <Link to="/register" className="text-[#7a7977] font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
