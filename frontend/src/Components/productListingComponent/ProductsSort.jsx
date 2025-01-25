import React from "react";

const ProductsSort = React.memo(({ products }) => {
  return (
    <div className="flex items-center justify-between bg-white sticky top-0 py-2 ">
      <span className="font-poppinsMedium text-sm ">
        {products?.length} products available
      </span>
      <select className="select font-poppinsLight text-sm !outline-none !border !border-black rounded-none w-full max-w-xs">
        <option disabled selected>
          Sort by
        </option>
        <option>Price, high to low</option>
        <option>Price, low to high</option>
        <option>Alphabetically, A-Z</option>
        <option>Alphabetically, Z-A</option>
      </select>
    </div>
  );
});

export default ProductsSort;
