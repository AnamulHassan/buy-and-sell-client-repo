import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';
import { Image } from 'primereact/image';

const MyProduct = () => {
  useTitle('Pay&Buy My Product');
  const { user } = useContext(AuthContext);
  const [id, setId] = useState('');
  const toast = useRef(null);
  const {
    data: productsData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['products', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/product?email=${user?.email}`,
        {
          headers: {
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
  const accept = () => {
    fetch(`http://localhost:5000/product/${id}?email=${user?.email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem('P&B-token')
        )}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result?.deletedCount > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product has been deleted',
            life: 3000,
          });
          refetch();
        }
      })
      .catch(error =>
        toast.current.show({
          severity: 'error',
          summary: 'Cancel',
          detail: error.message,
          life: 3000,
        })
      );
  };

  const reject = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Cancel',
      detail: 'You have canceled this process',
      life: 3000,
    });
  };
  const handleDelete = id => {
    setId(id);
    confirmDialog({
      message: 'Do you want to delete product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-outlined p-button-danger',
      rejectClassName: 'p-button-outlined p-button-info',
      accept,
      reject,
    });
  };
  const handleAdvertise = id => {
    fetch(`http://localhost:5000/product/${id}?email=${user?.email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem('P&B-token')
        )}`,
      },
      body: JSON.stringify({ isAdvertise: true }),
    })
      .then(res => res.json())
      .then(result => {
        if (result?.modifiedCount) {
          refetch();
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product is ready for advertising',
            life: 3000,
          });
        }
      })
      .catch(error => {
        toast.current.show({
          severity: 'error',
          summary: 'Cancel',
          detail: error.message,
          life: 3000,
        });
      });
  };
  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }

  return (
    <section data-aos="zoom-out">
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
                  <th className="py-3 px-2 text-center">Payment</th>
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
                        <Image
                          src={product.img ? product.img : 'Image not found'}
                          zoomSrc={
                            product.img ? product.img : 'Image not found'
                          }
                          alt="Image"
                          width="64"
                          height="64"
                          preview
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
                                  timeZone: 'BST',
                                }
                              )}`
                            : 'Time not found'}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {product.isPaid ? (
                            <span className="border-2 border-[#af8071] text-[#4a8fa8] px-2 py-[2px] rounded-md duration-200  select-none">
                              Paid
                            </span>
                          ) : (
                            <span className="border-2 border-[#4a8fa8] text-[#af8071] px-2 py-[2px] rounded-md duration-200 select-none ">
                              Unpaid
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {product?.isAdvertise ? (
                          <span className="bg-[#c5a07e] text-white px-2 py-1 rounded-md duration-200 select-none">
                            Released
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAdvertise(product._id)}
                            className="bg-[#4a8fa8] text-white px-2 py-1 rounded-md duration-200 cursor-pointer hover:bg-sky-600"
                          >
                            Advertise
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Button
                          id="button-delete"
                          onClick={() => handleDelete(product._id)}
                          label="Delete"
                        ></Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center mt-16 text-[#7a7977] text-2xl font-semibold ">
            Your din't add any product
          </h2>
        </div>
      )}
      <div>
        <div>
          <Toast ref={toast} />

          <div className="card">
            <ConfirmDialog />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProduct;
