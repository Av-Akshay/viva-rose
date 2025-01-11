import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";

const CartAmount = (props) => {
  return (
    <React.Fragment>
      <div className="cart-button">
        <div className=" flex items-center border-2 border-headingColor w-fit">
          <button
            className="leading-4 border-none p-2 m-2 font-poppinsMedium"
            onClick={() => {
              props.decrement();
            }}
          >
            <HiMinus className=" text-headingColor" />
          </button>
          <div className="text-lg my-2 font-poppinsMedium text-black">
            {props.Amount}
          </div>

          <button
            className="leading-4 border-none p-2 m-2 font-poppinsMedium"
            onClick={() => {
              props.increment();
            }}
          >
            <BsPlusLg className="text-headingColor" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartAmount;
