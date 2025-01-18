import React, { useState } from "react";

import { dashboardOrderList } from "../../../utils/constant";

const DashboardOrderList = () => {
  let currentDate = new Date();

  let myArray = Array.from({ length: 95 }, (_, i) => i);
  let orderOnOnePage = 10;
  let [orderIndex, setOrderIndex] = useState(0);

  let totalPages = Math.ceil(myArray.length / orderOnOnePage);

  let ordersShown = myArray.slice(
    orderIndex * orderOnOnePage,
    orderIndex * orderOnOnePage + orderOnOnePage
  );
  return (
    <div className=" flex flex-col gap-3 w-full h-full p-5">
      <h1 className="text-black font-poppinsBold text-3xl">Order List</h1>
      <div className="rounded-lg h-full bg-gray-100 overflow-auto w-full px-2 py-5 flex flex-col gap-2">
        <div className="text-black font-poppinsSemibold">
          <hr className="h-[0.15rem] bg-black" />
          <div className=" mt-5 grid grid-rows-1 grid-cols-6 bg-transparent place-content-center  ">
            <span className="grid place-content-center"> Product </span>
            <span className="grid place-content-center"> Order ID </span>
            <span className="grid place-content-center"> Date </span>
            <span className="grid place-content-center"> customer Name </span>
            <span className="grid  place-content-center "> Status </span>
            <span className="grid place-content-center"> Amount </span>
          </div>
        </div>
        {ordersShown?.map((item) => {
          return (
            <div key={item} className="text-black font-poppinsLight">
              <hr className="h-[0.15rem] bg-black" />
              <div className=" mt-5 grid grid-rows-1 grid-cols-6 bg-transparent place-content-center  ">
                <span className="grid place-content-center">
                  {dashboardOrderList?.product}
                </span>
                <span className="grid place-content-center ">
                  {" "}
                  {dashboardOrderList.orderId}{" "}
                </span>
                <span className="grid place-content-center ">
                  {currentDate.toLocaleDateString()}
                </span>
                <span className="grid place-content-center">
                  {dashboardOrderList?.customerName}
                </span>
                <span className="grid place-content-center">
                  {" "}
                  {dashboardOrderList?.status}{" "}
                </span>
                <span className="grid place-content-center">
                  {" "}
                  {dashboardOrderList?.amount}{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="join h-fit">
        <button
          onClick={() => {
            if (orderIndex > 0) {
              setOrderIndex(orderIndex - 1);
            }
          }}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn"> Page {orderIndex + 1} </button>
        <button
          onClick={() => {
            if (orderIndex + 1 < totalPages) {
              setOrderIndex(orderIndex + 1);
            }
          }}
          className="join-item btn"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default DashboardOrderList;
