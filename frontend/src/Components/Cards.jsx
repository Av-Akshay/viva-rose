import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Cards = ({ pic, name }) => {
  return (
    <div className="pb-2 flex flex-col gap-2 border border-gray-400 transition-all hover:shadow-cardShadow ">
      <div className="w-full overflow-hidden h-52 bg-white ">
        <img className="w-full h-full" src={pic} alt="" />
      </div>
      <div className="flex items-center justify-between font-poppinsMedium w-[95%] mx-auto">
        <div className=" flex flex-col gap-1">
          <span className="capitalize ">{name}</span>
          <span> Rs. 9888 </span>
        </div>
        <FaRegHeart className="text-red-500" />
      </div>
    </div>
  );
};

export default Cards;
