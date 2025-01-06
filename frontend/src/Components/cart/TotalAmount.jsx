// import { useSelector } from "react-redux";
import React from "react";

const TotalAmount = () => {
  //   const data = useSelector((state) => state.productStore.cart);

  //   let totalAmount = data?.reduce((accum, currentValue) => {
  //     return (accum += currentValue.price * currentValue.quantity);
  //   }, 0);

  return (
    <div className="flex items-end gap-5 justify-center flex-col my-5 max-sm:items-center">
      <div className="flex items-baseline gap-2">
        <p className="font-poppinsLight">Subtotal</p>
        <span className="text-5xl font-medium font-poppinsMedium max-sm:text-3xl max-md:text-4xl">
          Rs.5000
        </span>
      </div>
      <p className="font-poppinsLight max-sm:text-center">
        Shipping and taxes calculated at checkout
      </p>
      <button className="font-bold font-poppinsMedium text-white bg-headingColor rounded-[10px] px-[20px] py-[15px] text-3xl  max-sm:text-xl max-md:text-2xl">
        Place order
      </button>
    </div>
  );
};

export default TotalAmount;
