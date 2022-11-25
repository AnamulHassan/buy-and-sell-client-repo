import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';

const MyProduct = () => {
  useTitle('Pay&Buy My Product');
  const { user } = useContext(AuthContext);

  const { data: productsData = [], refetch } = useQuery({
    queryKey: ['prducts', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/product?email=${user?.email}`,
        {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem('P&B-token')
            )}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(productsData);
  return (
    <section>
      {productsData?.length > 0 ? (
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl text-[#82441b] font-bold text-[] leading-tight">
            Your Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className=" bg-gradient-to-r font-semibold text-white from-[#af8071] to-[#c5a07e]">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center">Index</th>
                  <th className="py-3 px-2 text-center">Image</th>
                  <th className="py-3 px-2 text-center">Product Name</th>
                  <th className="py-3 px-2 text-center">Asking Price</th>
                  <th className="py-3 px-2 text-center">Post Date</th>
                  <th className="py-3 px-2 text-center">Post Time</th>
                  <th className="py-3 px-2 text-center">Advertisement</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {productsData?.length > 0 &&
                  productsData.map((product, index) => (
                    <tr
                      key={product._id}
                      className="border-b border-opacity-20 font-semibold text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <img
                          className="w-12 h-12"
                          src={product.img ? product.img : 'Image not found'}
                          alt=""
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {product.productName
                            ? product.productName
                            : 'Name not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {product.resalePrice
                            ? `$ ${product.resalePrice}`
                            : 'Price not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {product.date
                            ? `${new Date(
                                product.date
                              ).getUTCDate()}/${new Date(
                                product.date
                              ).getUTCMonth()}/${new Date(
                                product.date
                              ).getUTCFullYear()}`
                            : 'Date not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {product.date
                            ? `${new Date(product.date).toLocaleTimeString(
                                'en',
                                {
                                  timeStyle: 'short',
                                  hour12: true,
                                  timeZone: 'UTC',
                                }
                              )}`
                            : 'Time not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button className="bg-[#4a8fa8] text-white px-2 py-1 rounded-md duration-200 cursor-pointer hover:bg-sky-600">
                          Advertise
                        </button>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button className="bg-[#aa2c08] text-white px-2 py-1 rounded-md duration-200 cursor-pointer hover:bg-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center mt-8 text-2xl font-bold">
            Your din't add any product
          </h2>
        </div>
      )}
    </section>
  );
};

export default MyProduct;
