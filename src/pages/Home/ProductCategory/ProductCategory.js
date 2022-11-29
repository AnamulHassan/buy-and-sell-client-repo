import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderPrimary from '../../../components/LoaderPrimary/LoaderPrimary';

const ProductCategory = () => {
  const [number, setNumber] = useState(3);
  const [categoryCount, setCategoryCount] = useState(0);
  const {
    data: categoryData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['category', number],
    queryFn: async () => {
      const res = await fetch(
        `https://pay-and-buy-server-anamulhassan.vercel.app/category?size=${number}`
      );
      const data = await res.json();
      setCategoryCount(data.count);
      return data.result;
    },
  });
  const handleSeeMore = () => {
    setNumber(categoryCount);
    refetch();
  };

  if (isLoading) {
    return <LoaderPrimary></LoaderPrimary>;
  }
  return (
    <div className="my-16">
      {categoryData.length > 0 && (
        <div>
          <h2 className="text-4xl text-[#82441b] font-semibold tracking-tight mb-4">
            <span className="text-5xl font-normal">E</span>xplore Popular
            Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData?.map(category => (
              <div
                data-aos="zoom-in-down"
                key={category._id}
                className="bg-gradient-to-r
            from-[#af8071] to-[#c5a07e] p-2"
              >
                <div>
                  <img
                    src={category.img ? category.img : 'No image found'}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-2xl text-white select-none">
                    {category.categoryTitle
                      ? category.categoryTitle
                      : 'Category Title Not Found'}
                  </h2>
                  <Link
                    to={`/products/${category?.categoryTitle?.toLowerCase()}`}
                    className="mt-4 inline-block border-[1px] hover:border-[#af8071] px-4 py-1 rounded bg-gradient-to-r font-semibold text-white duration-300 to-[#af8071] from-[#c5a07e] hover:text-[#d3d2cf]"
                  >
                    More Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {categoryCount !== number && (
        <div>
          {categoryData?.length > 0 && (
            <div className="w-full flex items-center justify-center mt-4">
              <button
                onClick={() => handleSeeMore(categoryCount)}
                className="px-4 py-1 rounded bg-gradient-to-r font-semibold text-white duration-300 from-[#af8071] to-[#c5a07e] hover:text-[#d3d2cf]"
              >
                More Category
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
