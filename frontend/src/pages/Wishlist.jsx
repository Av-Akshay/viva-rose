import React from "react";
import { Link } from "react-router-dom";
import { WishlistProduct } from "../Components";
import { HiArrowSmLeft } from "react-icons/hi";

const Wishlist = () => {
  return (
    <div className="h-[70vh] overflow-auto bg-bgColor text-textColor px-20 py-12 max-sm:px-5 font-milligram-trail">
      <div className="text-[1.8rem] grid grid-rows-1 grid-cols-wishlist-layout-one py-5 max-lg:grid-cols-wishlist-layout-two max-md:grid-cols-wishlist-layout-third max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px]">
        <div>
          <Link className="flex gap-2 items-center" href={"/allProducts"}>
            <HiArrowSmLeft className="text-headingColor" />
            <p>Continue shopping</p>
          </Link>
        </div>
        <div>
          <p>Price</p>
        </div>
        <div>
          <p> Quantity</p>
        </div>
      </div>
      <hr className="!text-headingColor !bg-headingColor !h-[2px]" />
      <WishlistProduct />
    </div>
  );
};

export default Wishlist;
