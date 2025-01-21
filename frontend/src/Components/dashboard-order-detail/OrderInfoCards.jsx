import React from "react";

const OrderInfoCards = ({ heading, span1, span2, span3 }) => {
  return (
    <div className="flex flex-col gap-2 w-52 h-36 p-5 rounded-lg bg-gray-50 shadow-md shadow-gray-700">
      <h3 className="text-xl font-poppinsMedium text-black"> {heading} </h3>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-poppinsLight text-black capitalize">
          {span1}{" "}
        </span>
        <span className="text-sm font-poppinsLight text-black capitalize">
          {span2}{" "}
        </span>
        <span className="text-sm font-poppinsLight text-black capitalize">
          {span3}{" "}
        </span>
      </div>
    </div>
  );
};

export default OrderInfoCards;
