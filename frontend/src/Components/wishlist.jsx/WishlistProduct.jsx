import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { jewellery } from "../../utils/icons";

const WishlistProduct = () => {
  //   const dispatch = useDispatch();
  //   const { quantity, handelDecrementAmount, handelIncrementAmount } =
  //     useAmount();

  return (
    <div>
      <div className="grid grid-rows-1 grid-cols-wishlist-layout-one max-lg:grid-cols-wishlist-layout-two max-md:grid-cols-wishlist-layout-third py-12">
        <div className="flex items-start gap-10 max-sm:items-center">
          <MdDelete className="text-red-500 w-8 h-8 hover:scale-125 cursor-pointer transition-all relative hover:z-10" />
          <div className="flex items-center justify-center gap-4 pr-20 max-xl:pr-10 max-sm:pr-5">
            <img
              className="w-[12.5rem]  rounded-md max-lg:hidden"
              src={jewellery}
              alt="product"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-5 max-lg:gap-2">
              <h2 className="text-[1.8rem] max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px] font-medium">
                Jewellery
              </h2>
            </div>
          </div>
        </div>
        <div className="flex items-center text-[1.8rem] font-medium max-lg:text-2xl max-sm:text-base max-[360px]:text-[12px]">
          <p className="font-poppinsMedium"> Rs. 5000 </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-32 max-lg:w-28 max-sm:w-16 hover:bg-main-color hover:text-[#DBDBDB] transition-all text-main-color py-3 border border-main-color rounded-md flex items-center justify-around font-medium text-[1.8rem] max-sm:text-base max-[360px]:text-[12px] max-sm:px-3 max-sm:py-2 max-sm:gap-3">
            <button
              className="text-headingColor font-poppinsMedium"
              //  onClick={handelDecrementAmount.bind(this, item.id)}
            >
              -
            </button>
            <p className="font-poppinsMedium"> 1 </p>
            <button
              className="text-headingColor font-poppinsMedium"
              //   onClick={() => {
              //     handelIncrementAmount(item.id);
              //   }}
            >
              +
            </button>
          </div>
          <Link
            href={"#"}
            className="text-[1.4rem] border-b-2 border-headingColor font-poppinsMedium font-medium max-lg:text-[1.2rem] max-sm:text-base max-[360px]:text-[12px] max-md:hidden"
          >
            Select options
          </Link>
        </div>
      </div>
      <hr className="text-headingColor bg-headingColor h-[2px]" />
    </div>
  );
};

export default WishlistProduct;
