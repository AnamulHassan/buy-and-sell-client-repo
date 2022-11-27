import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hook/useTitle';
import toast from 'react-hot-toast';
import useToken from '../../hook/useToken';

const Register = () => {
  useTitle('Pay&Buy Register');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [userCategory, setUserCategory] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token] = useToken(userEmail);
  const options = ['Seller', 'Buyer'];
  const { setUser, createUserWithEmailPass, userUpdate, loading, setLoading } =
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
  if (token) {
    navigate(from, { replace: true });
  }
  const handleCreateUser = data => {
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

    // console.log(data.email, data.password);
    createUserWithEmailPass(data.email, data.password)
      .then(result => {
        userUpdate(data.name)
          .then(() => {
            userInfoUpdateToDB(userInfo, result.user);
          })
          .catch(error => setShowError(error.message));
      })
      .catch(error => {
        setLoading(false);
        if (error.message.includes('auth/email-already-in-use')) {
          setShowError('This user name already exist');
        } else if (error.message.includes('auth/weak-password')) {
          setShowError('Password should be at least 6 characters');
        } else {
          setShowError(error.message);
        }
      });
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
          setUserEmail(userInfo?.email);
          reset();
          toast.success(`${userInfo?.displayName}, User created successfully`, {
            style: {
              border: '2px solid #aa6f35',
              padding: '16px',
              color: '#aa6f35',
              fontWeight: '600',
            },
          });
        }
      })
      .catch(error => setShowError(error.message));
  };

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div data-aos="zoom-in" className="w-10/12 mx-auto">
      <div className="mx-auto flex justify-content-center">
        <div className="w-11/12 lg:w-2/5 mx-auto">
          <h5 className="text-center mt-12 mb-6 text-3xl font-bold tracking-tight text-[]">
            Register
          </h5>
          <form
            onSubmit={handleSubmit(handleCreateUser)}
            className="p-fluid space-y-6 outline-[#aa6f35] ring-[#aa6f35]"
          >
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required.' }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={
                        ('custom-hover',
                        classNames({
                          'p-invalid ': fieldState.invalid,
                        }))
                      }
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ 'p-error': errors.name })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage('name')}
            </div>
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
            <div className="card">
              <SelectButton
                value={userCategory}
                options={options}
                onChange={e => setUserCategory(e.value)}
              />
            </div>
            <Button
              type="submit"
              label="Register"
              disabled={loading}
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

export default Register;
