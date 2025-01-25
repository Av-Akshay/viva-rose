import React from "react";

import useGetAllJewellery from "../hooks/useGetAllJewellery";

import { Filters, Products, ProductsSort } from "../Components";

const ProductsListingPage = () => {
  const { error, isError, isLoading, products } = useGetAllJewellery();
  // console.log(products);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return (
      <p style={{ color: "red" }}>
        Error: {error.message || "Something went wrong."}
      </p>
    );
  }
  return (
    <div className=" w-full mx-auto flex items-baseline my-10">
      <div className=" flex flex-col gap-5 w-[25%] pr-2 pl-10">
        <Filters />
      </div>
      <div className="w-full border-l relative border-black pl-2 h-[74vh] overflow-x-auto pr-10 my-scrollbar">
        <ProductsSort products={products} />
        <div className="mt-2 flex items-center justify-center flex-wrap gap-5">
          <Products items={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;
