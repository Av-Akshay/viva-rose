import React from "react";

import { ordersDetail } from "../utils/constant";
import { OrderInfoCards } from "../Components";

const DashboardOrderDetail = () => {
  let currentDate = new Date();

  let subTotal = 0;

  ordersDetail?.products?.forEach((item) => {
    console.log(typeof Number(item?.amount));
    console.log(Number(item?.amount));

    subTotal = subTotal + Number(item.amount);
  });
  let total = subTotal + (subTotal * 10) / 100;
  return (
    <div className="h-full flex flex-col w-full p-2">
      <h1 className=" text-headingColor my-2 text-3xl font-poppinsBold ">
        Orders Details
      </h1>
      <div className="w-full h-auto bg-white rounded-lg px-2 pt-1 pb-4 ">
        <div className="flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <h2 className="text-black text-xl font-poppinsMedium">
              {" "}
              Order ID: {ordersDetail?.orderId}
            </h2>{" "}
            <span className="px-2 py-1 bg-yellow-500 text-white font-poppinsMedium text-sm rounded-md">
              {ordersDetail?.orderStatus}
            </span>
          </div>
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="capitalize btn m-1">
              Change status
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content -!left-10 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Delivered</a>
              </li>
              <li>
                <a> canceled </a>
              </li>
              <li>
                <a> refund </a>
              </li>
              <li>
                <a> pending </a>
              </li>
            </ul>
          </div>
        </div>
        {/*---------------- order information------------ */}
        <div className="w-full flex items-center justify-center gap-10">
          <OrderInfoCards
            heading={"customer"}
            span1={`Full Name: ${ordersDetail?.customer?.name}`}
            span2={`Email: ${ordersDetail?.customer?.email}`}
            span3={`Phone: ${ordersDetail?.customer?.phone}`}
          />
          <OrderInfoCards
            heading={"Order Info"}
            span1={`shipping: ${ordersDetail?.orderInfo?.shipping}`}
            span2={`payment: ${ordersDetail?.orderInfo?.paymentMethod}`}
            span3={`status: ${ordersDetail?.orderInfo?.status}`}
          />
          <OrderInfoCards
            heading={"Delivered To"}
            span1={`Address: ${ordersDetail?.deliverTo?.address}`}
          />
        </div>
      </div>
      <div className="w-full h-full bg-white rounded-lg p-2 mt-3 overflow-auto ">
        <div className="rounded-lg bg-gray-100 w-full px-2 py-5 flex flex-col gap-2">
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
          {ordersDetail?.products?.map((item) => {
            return (
              <div key={item} className="text-black font-poppinsLight">
                <hr className="h-[0.15rem] bg-black" />
                <div className=" mt-5 grid grid-rows-1 grid-cols-6 bg-transparent place-content-center  ">
                  <span className="grid place-content-center">
                    {item?.product}
                  </span>
                  <span className="grid place-content-center ">
                    {" "}
                    {item.orderId}{" "}
                  </span>
                  <span className="grid place-content-center ">
                    {currentDate.toLocaleDateString()}
                  </span>
                  <span className="grid place-content-center">
                    {item?.customerName}
                  </span>
                  <span className="grid place-content-center">
                    {" "}
                    {item?.status}{" "}
                  </span>
                  <span className="grid place-content-center">
                    {" "}
                    {item?.amount}{" "}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-2 mr-2">
          <div className="rounded-lg shadow-lg shadow-gray-400 p-5 w-[25%] grid grid-cols-2 grid-rows-3 bg-gray-300">
            <span className="text-black font-poppinsLight ">Subtotal</span>
            <span className="text-black font-poppinsLight "> {subTotal} </span>
            <span className="text-black font-poppinsLight ">Tax </span>
            <span className="text-black font-poppinsLight "> 10% </span>
            <span className="text-lg text-black font-poppinsBold">Total</span>
            <span className="text-lg text-black font-poppinsBold">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderDetail;
