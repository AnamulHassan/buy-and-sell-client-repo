import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Password } from 'primereact/password';

import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';

const Register = () => {
  const url = `https://api.imgbb.com/1/upload&key=${process.env.REACT_APP_IMGBB_SECRET_KEY}`;
  console.log(url);
  const [userCategory, setUserCategory] = useState('');
  const options = ['Seller', 'Buyer'];
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

  const onSubmit = data => {
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
    console.log(userInfo);
  };

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  return (
    <div className="w-10/12 mx-auto">
      <div className="mx-auto flex justify-content-center">
        <div className="w-11/12 lg:w-2/5 mx-auto">
          <h5 className="text-center mt-12 mb-6 text-3xl font-bold tracking-tight text-[]">
            Register
          </h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
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
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
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
            <Button type="submit" label="Login" className="bg-[#af8071]" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
