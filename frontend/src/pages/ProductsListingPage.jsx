import React from "react";

import { Filters } from "../Components";

const ProductsListingPage = () => {
  return (
    <div className=" w-4/5 mx-auto flex items-center">
      <div className=" flex flex-col gap-5 w-[25%]">
        <Filters />
      </div>
      <div>
        <div></div>
        {/* <Products/> */}
      </div>
    </div>
  );
};

export default ProductsListingPage;
