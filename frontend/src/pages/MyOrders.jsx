import React from "react";
import { FaStar } from "react-icons/fa";

import { orders } from "../utils/constant";
import { Link } from "react-router-dom";
import { set } from "../utils/icons";

const MyOrders = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-center">
      <div className="w-[95%] flex items-start gap-5 my-10">
        <div className="flex flex-col gap-5 w-[20%] min-h-[18rem] bg-white p-5 shadow-lg shadow-black">
          <h1 className="text-center text-3xl text-black font-poppinsSemibold">
            Filters
          </h1>
          <details
            tabIndex={0}
            className="collapse !gap-2 collapse-arrow border-black  bg-transparent !px-0 py-0"
          >
            <summary className="collapse-title font-poppinsMedium text-lg text-headingColor !px-0 !py-0 after:!top-[0.9rem] !min-h-[2rem]">
              Order status
            </summary>
            <div className="collapse-content flex flex-col gap-2 !px-0">
              <div className="w-full flex items-center gap-2">
                <input
                  id="threeStart"
                  type="radio"
                  name="orderFilter"
                  className="radio"
                />
                <label
                  htmlFor="threeStart"
                  className="w-full flex items-center  font-poppinsMedium"
                >
                  On the way
                </label>
              </div>
              <div className="w-full flex items-center gap-2">
                <input
                  id="fourStar"
                  type="radio"
                  name="orderFilter"
                  className="radio"
                />
                <label
                  htmlFor="fourStar"
                  className="w-full flex items-center  font-poppinsMedium"
                >
                  Delivered
                </label>
              </div>
              <div className="w-full flex items-center gap-2">
                <input
                  id="fourStar"
                  type="radio"
                  name="orderFilter"
                  className="radio"
                />
                <label
                  htmlFor="fourStar"
                  className="w-full flex items-center  font-poppinsMedium"
                >
                  Cancelled
                </label>
              </div>
              <div className="w-full flex items-center gap-2">
                <input
                  id="fourStar"
                  type="radio"
                  name="orderFilter"
                  className="radio"
                />
                <label
                  htmlFor="fourStar"
                  className="w-full flex items-center  font-poppinsMedium"
                >
                  Returned
                </label>
              </div>
            </div>
          </details>
        </div>
        <div className=" flex flex-col gap-5 w-[80%] bg-white p-10 shadow-lg shadow-black">
          {orders?.map((order) => {
            return (
              <div
                className="px-5 py-2 flex items-start border-2 border-headingColor rounded-lg justify-between"
                key={order?.id}
              >
                <div className="flex gap-5">
                  <img className="w-16 h-20 rounded-xl" src={set} alt="" />
                  <div className="flex flex-col gap-2">
                    <span className="font-poppinsMedium text-headingColor text-lg">
                      {" "}
                      {order?.name}{" "}
                    </span>
                    <p className="text-sm text-gray-500 font-poppinsLight">
                      {" "}
                      color: {order?.color}{" "}
                    </p>
                  </div>
                </div>

                <p className="font-poppinsMedium text-headingColor text-lg">
                  {" "}
                  Rs. {order?.price}{" "}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="font-poppinsMedium capitalize text-headingColor text-lg">
                    {`  ${order?.status} on ${order.date} `}
                  </span>
                  <p className="text-sm text-gray-600 font-poppinsLight">
                    {order?.tagline}
                  </p>
                  <Link
                    to="#"
                    className="font-poppinsMedium flex gap-1 items-center text-blue-500"
                  >
                    <FaStar /> Rate & Review Products
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
