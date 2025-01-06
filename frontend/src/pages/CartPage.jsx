import React from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CartProduct, TotalAmount } from "../Components";

// import { CartProduct, TotalAmount } from "@/components/index";

const CartPage = () => {
  return (
    <div className="h-[70vh] overflow-auto bg-bgColor text-textColor px-16 py-12 max-sm:px-5 font-milligram-trail">
      <div className="text-[1.6rem] font-poppinsMedium grid grid-rows-1 grid-cols-cart-layout-one py-5 max-lg:grid-cols-cart-layout-two max-md:grid-cols-cart-layout-third max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px]">
        <span className="text-end">
          <Link className="flex gap-2 items-center" href={"/allProducts"}>
            <HiArrowSmLeft className="text-headingColor" />
            <p className="">Continue shopping</p>
          </Link>
        </span>
        <div className="text-end">
          <p>Price</p>
        </div>
        <div className="text-end">
          <p> Total</p>
        </div>
      </div>
      <hr className="text-headingColor bg-headingColor h-[2px]" />
      <CartProduct />;
      <TotalAmount />
    </div>
  );
};

export default CartPage;
