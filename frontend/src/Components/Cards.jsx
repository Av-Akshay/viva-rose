import React from "react";

const Cards = ({ pic, name }) => {
  return (
    <div className="pb-2 flex flex-col gap-2 border border-gray-400 transition-all hover:shadow-cardShadow ">
      <div className="w-full overflow-hidden h-52 bg-white ">
        <img className="w-full h-full" src={pic} alt="" />
      </div>
      <p className="capitalize font-poppinsSemibold text-lightColor text-center">
        {name}
      </p>
    </div>
  );
};

export default Cards;