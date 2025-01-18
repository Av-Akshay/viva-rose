import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Cards } from "../../index";
import { ring } from "../../../utils/icons";

const DashboardAllProducts = () => {
  let myArray = Array.from({ length: 95 }, (_, i) => i);
  let cardOnOnePage = 10;
  let [cardsStart, setCardsStart] = useState(0);

  let totalPages = Math.ceil(myArray.length / cardOnOnePage);

  let cardsShown = myArray.slice(
    cardsStart * cardOnOnePage,
    cardsStart * cardOnOnePage + cardOnOnePage
  );

  return (
    <div className="w-full flex flex-col gap-2 h-full p-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl text-headingColor font-poppinsBold">
          {" "}
          All Products{" "}
        </h1>
        <Link className="uppercase bg-headingColor px-5 py-2 rounded-lg text-white">
          Add new product
        </Link>
      </div>
      <div className="h-full overflow-auto w-full my-scrollbar">
        <div className="w-full flex flex-wrap justify-center items-center gap-5">
          {cardsShown?.map((item, index) => {
            return <Cards key={index} name="Ring" pic={ring} />;
          })}
        </div>
      </div>
      <div>
        <div className="join">
          <button
            onClick={() => {
              if (cardsStart > 0) {
                setCardsStart(cardsStart - 1);
              }
            }}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn"> Page {cardsStart + 1} </button>
          <button
            onClick={() => {
              console.log(totalPages);

              if (cardsStart + 1 < totalPages) {
                setCardsStart(cardsStart + 1);
              }
            }}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAllProducts;
