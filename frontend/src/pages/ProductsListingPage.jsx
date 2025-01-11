import React from "react";

import { Filters, Products, ProductsSort } from "../Components";

const ProductsListingPage = () => {
  let items = [];
  for (let i = 0; i <= 50; i++) {
    items.push(i);
  }
  return (
    <div className=" w-full mx-auto flex items-baseline">
      <div className=" flex flex-col gap-5 w-[25%] pr-2 pl-10">
        <Filters />
      </div>
      <div className="w-full border-l relative border-black pl-2 h-[74vh] overflow-x-auto pr-10 my-scrollbar">
        <ProductsSort />
        <div className="mt-2 flex items-center justify-center flex-wrap gap-5">
          <Products items={items} />
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;
