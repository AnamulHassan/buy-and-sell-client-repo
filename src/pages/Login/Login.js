import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userCategory, setUserCategory] = useState('');
  const options = ['Seller', 'Buyer'];
  const { setUser, createUserWithEmailPass, userUpdate } =
    useContext(AuthContext);
  const [showError, setShowError] = useState('');
  const defaultValues = {
    name: '',
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
    const userInfo = {
      name: data.name,
      email: data.email,
      isBuyer:
        userCategory.toLowerCase() === 'buyer'
          ? true
          : userCategory.toLowerCase() === ''
          ? true
          : false,
      isSeller: userCategory.toLowerCase() === 'seller' ? true : false,
    };
    const getFormErrorMessage = name => {
      return (
        errors[name] && (
          <small className="p-error">{errors[name].message}</small>
        )
      );
    };
    return (
      <div className="w-10/12 mx-auto">
        <div className="mx-auto flex justify-content-center">
          <div className="w-11/12 lg:w-2/5 mx-auto">
            <h5 className="text-center mt-12 mb-6 text-3xl font-bold tracking-tight text-[]">
              Register
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
                        message:
                          'Invalid email address. E.g. example@email.com',
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
              <Button type="submit" label="Login" className="btn-primary" />
            </form>
            {showError && (
              <p className="text-center -mb-5 text-sm font-semibold text-[#aa2c08]">
                {showError}
              </p>
            )}
            <div className="w-full mt-6">
              <SocialLogin></SocialLogin>
              <p className="text-center font-semibold my-2 text-[#a2a7a5]">
                You have an account already?{' '}
                <Link to="/login" className="text-[#7a7977] font-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Login;
