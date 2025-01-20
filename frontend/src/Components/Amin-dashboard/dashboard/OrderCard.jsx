import React from "react";

const OrderCard = ({ orderType, orders, Icon }) => {
  return (
    <div className="bg-white rounded-md p-3 flex flex-col gap-2 ">
      <div className="font-poppinsMedium w-full text-lg flex items-center gap-2 text-black">
        {Icon && <Icon className="w-8 h-8" />}
        <h2 className="capitalize">{orderType} </h2>
      </div>
      <div className="w-full flex justify-end">
        <span className="font-poppinsLight text-lg text-black">{orders}</span>
      </div>
    </div>
  );
};

export default OrderCard;
