import React from "react";
import { MdDelete } from "react-icons/md";

import { jewellery } from "../../utils/icons";

// import useAmount from "@/hooks/useAmount";
// import { deleteCartProduct } from "@/store/slice";

const CartProduct = () => {
  // const { handelIncrementCartAmount, handelDecrementCartAmount } = useAmount();
  // const dispatch = useDispatch();
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-cart-layout-one max-lg:grid-cols-cart-layout-two max-md:grid-cols-cart-layout-third py-12">
        <div className="flex items-start gap-10 max-sm:items-center">
          <MdDelete className="text-red-500 w-8 h-8 hover:scale-125 cursor-pointer transition-all relative hover:z-10" />
          <div className="flex justify-center gap-5 pr-20 max-xl:pr-10 max-sm:pr-5">
            <img
              className="w-[12.5rem] rounded-md max-lg:hidden"
              src={jewellery}
              alt="product"
            />
            <div className="flex flex-col gap-2 max-lg:gap-2">
              <h2 className="text-[1.8rem] max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px] font-medium">
                Jewellery
              </h2>
              <div className="w-32 max-sm:w-20 text-main-color py-[6px] border hover:bg-main-color hover:text-[#DBDBDB] border-headingColor rounded-md flex items-center justify-around font-medium text-[1.8rem] max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px] max-sm:px-2 max-sm:py-1 max-sm:gap-3">
                <button
                  className="text-headingColor font-poppinsMedium"
                  // onClick={() => {
                  //   handelDecrementCartAmount(item.id);
                  // }}
                >
                  -
                </button>
                <p className="font-poppinsSemibold"> 1 </p>
                <button
                  className="text-headingColor font-poppinsMedium"
                  // onClick={() => {
                  //   handelIncrementCartAmount(item.id);
                  // }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end text-[1.8rem] max-lg:text-2xl font-medium max-sm:text-base max-[360px]:text-[12px]">
          <p className="font-poppinsSemibold">Rs. 5000</p>
        </div>
        <div className="flex items-center justify-end text-[1.8rem] max-lg:text-2xl font-medium max-sm:text-base max-[360px]:text-[12px]">
          <p className="font-poppinsSemibold">Rs. 5000</p>
        </div>
      </div>
      <hr className="text-headingColor bg-headingColor h-[2px]" />
    </>
  );
};

export default CartProduct;
