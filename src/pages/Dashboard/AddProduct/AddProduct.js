import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useTitle from '../../../hook/useTitle';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  useTitle('Pay&Buy Add Product');
  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_IMGBB_API_KEY;
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data: categoryData = [] } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/category');
      const data = await res.json();
      return data.result;
    },
  });
  const condition = ['Excellent', 'Good', 'Fair'];
  const handleAddProduct = data => {
    const name = data.name;
    const email = data.email;
    const productName = data.productName;
    const category = data.category.toLowerCase();
    const condition = data.condition;
    const description = data.description;
    const originalPrice = data.originalPrice;
    const resalePrice = data.resalePrice;
    const purchaseYear = data.purchaseYear;
    const contact = data.contact;
    const location = data.location;
    const image = data.photo[0];
    const date = new Date().toISOString();

    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          const productInfo = {
            name,
            email,
            productName,
            category,
            condition,
            description,
            originalPrice,
            resalePrice,
            purchaseYear,
            contact,
            location,
            img: imgData.data.url,
            date,
            isBooking: false,
          };
          fetch(`http://localhost:5000/product?email=${user?.email}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem('P&B-token')
              )}`,
            },
            body: JSON.stringify(productInfo),
          })
            .then(res => res.json())
            .then(result => {
              if (result.acknowledged) {
                reset();
                navigate('/dashboard/my_product');
                toast.success('Product added Successfully', {
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
        }
      });
  };
  return (
    <section className="w-11/12 lg:w-2/5 my-4 mx-auto">
      <h2 className="text-center text-2xl font-bold mb-5">App Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="mb-[10px] ">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            id="name"
            type="text"
            defaultValue={user?.displayName}
            readOnly
            {...register('name', { required: 'name is required' })}
          />
          {errors?.name && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="mb-[10px] ">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            id="email"
            type="email"
            defaultValue={user?.email}
            readOnly
            {...register('email', { required: 'email is required' })}
          />
          {errors?.email && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="mb-[10px] ">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            id="productName"
            type="text"
            placeholder="Write your product name"
            {...register('productName', {
              required: 'product name is required',
            })}
          />
          {errors?.productName && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.productName?.message}
            </p>
          )}
        </div>
        <div className="flex space-x-2 mt-2 w-full">
          <div className="mb-[2px] w-1/2">
            <label className="block text-[#1f1713] font-semibold text-sm mb-[3px]">
              Product Category
            </label>
            <select
              {...register('category', { required: 'category is required' })}
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            >
              {categoryData &&
                categoryData.map((category, index) => (
                  <option
                    className="bg-[#c5a07e] text-[#e8eceb] cursor-pointer py-2"
                    key={index}
                  >
                    {category?.categoryTitle}
                  </option>
                ))}
            </select>
            {errors?.category && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-1">
                {errors.category?.message}
              </p>
            )}
          </div>
          <div className="mb-[2px] w-1/2">
            <label className="block text-[#1f1713] font-semibold text-sm mb-[3px]">
              Product Condition
            </label>
            <select
              {...register('condition', { required: 'condition is required' })}
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            >
              {condition &&
                condition.map((condition, index) => (
                  <option
                    className="bg-[#c5a07e] text-[#e8eceb] cursor-pointer py-2"
                    key={index}
                  >
                    {condition}
                  </option>
                ))}
            </select>
            {errors?.condition && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-1">
                {errors.condition?.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-[10px] mt-2">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="description"
          >
            Product Description
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            id="description"
            type="text"
            placeholder="Write product description"
            {...register('description', {
              required: 'description is required',
            })}
          />
          {errors?.description && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="flex space-x-2 mt-2 w-full">
          <div className=" mb-[10px] w-1/2">
            <label
              className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
              htmlFor="originalPrice"
            >
              Original Price
            </label>
            <input
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
              id="originalPrice"
              type="number"
              placeholder="Original Price"
              {...register('originalPrice', {
                required: 'original price is required',
              })}
            />
            {errors?.originalPrice && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
                {errors.originalPrice?.message}
              </p>
            )}
          </div>
          <div className="mb-[10px] w-1/2 ">
            <label
              className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
              htmlFor="resalePrice"
            >
              Resale Price
            </label>
            <input
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
              id="resalePrice"
              type="number"
              placeholder="Resale Price"
              {...register('resalePrice', {
                required: 'resale price is required',
              })}
            />
            {errors?.resalePrice && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
                {errors.resalePrice?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2 w-full">
          <div className=" mb-[10px] w-1/2">
            <label
              className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
              htmlFor="purchaseYear"
            >
              Year Of Purchase
            </label>
            <input
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
              id="purchaseYear"
              type="number"
              placeholder="Year Of Purchase"
              {...register('purchaseYear', {
                required: 'year of use is required',
              })}
            />
            {errors?.purchaseYear && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
                {errors.purchaseYear?.message}
              </p>
            )}
          </div>
          <div className="mb-[10px] w-1/2">
            <label
              className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
              id="contact"
              type="number"
              placeholder="Contact number"
              {...register('contact', {
                required: 'contact is required',
              })}
            />
            {errors?.contact && (
              <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
                {errors.contact?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-[10px] ">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-2 px-4"
            id="location"
            type="text"
            placeholder="Write your location"
            {...register('location', {
              required: 'location price is required',
            })}
          />
          {errors?.location && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.location?.message}
            </p>
          )}
        </div>

        <div className="mb-[10px] ">
          <label
            className="block text-[#1f1713] font-semibold text-sm mb-[3px]"
            htmlFor="photo"
          >
            Product Photo
          </label>
          <input
            className="block border-2 outline-none border-[#c5a07e] w-full rounded-md font-semibold text-[#7a7977] py-1 px-4"
            id="photo"
            type="file"
            {...register('photo', { required: 'photo is required' })}
          />
          {errors?.photo && (
            <p className="text-xs text-center font-semibold text-[#aa2c08] -mb-3">
              {errors.photo?.message}
            </p>
          )}
        </div>

        {errors.exampleRequired && <span>This field is required</span>}

        <input
          className="w-full py-2 mt-2 rounded bg-gradient-to-r font-semibold cursor-pointer text-white duration-300 from-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]"
          type="submit"
          value="Submit"
        />
      </form>
    </section>
  );
};

export default AddProduct;
