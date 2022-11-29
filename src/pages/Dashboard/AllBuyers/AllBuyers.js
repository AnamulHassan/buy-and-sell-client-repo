import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import useTitle from '../../../hook/useTitle';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';

const AllBuyer = () => {
  useTitle('Pay&Buy All Buyer');
  const { user } = useContext(AuthContext);
  const toast = useRef(null);
  const [id, setId] = useState('');
  const {
    data: sellersData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const res = await fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/allBuyer?email=${user?.email}`,
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
    fetch(
      `https://pay-and-buy-server-anamulhassan.vercel.app/buyer/${id}?email=${user?.email}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('P&B-token')
          )}`,
        },
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result?.deletedCount > 0) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Seller has been deleted',
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
  const handleSellerDelete = id => {
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
  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  return (
    <section data-aos="zoom-out">
      {sellersData?.length > 0 ? (
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl text-[#82441b] font-bold text-[] leading-tight">
            Your Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className=" bg-gradient-to-r font-semibold text-white from-[#af8071] to-[#c5a07e]">
                <tr className="text-left">
                  <th className="py-3 px-2 text-center">Index</th>
                  <th className="py-3 px-2 text-center">Seller Name</th>
                  <th className="py-3 px-2 text-center">Seller Email</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {sellersData?.length > 0 &&
                  sellersData.map((seller, index) => (
                    <tr
                      key={seller._id}
                      className="border-b border-opacity-20 font-semibold text-[#1f1713] text-left"
                    >
                      <td className="py-3 px-2 text-center">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>{seller.name ? seller.name : 'Name not found'}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p>
                          {seller.email ? `${seller.email}` : 'Email not found'}
                        </p>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <Button
                          className="btn-gradient-red"
                          onClick={() => handleSellerDelete(seller._id)}
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
            There is no seller
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

export default AllBuyer;
