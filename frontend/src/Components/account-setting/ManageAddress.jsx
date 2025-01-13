import React from "react";

import { addresses } from "../../utils/constant";
import { BsThreeDotsVertical } from "react-icons/bs";

const ManageAddress = () => {
  return (
    <div className="p-5">
      <h1 className="text-headingColor font-poppinsSemibold text-center text-2xl my-5">
        Manage Address
      </h1>
      <div>
        {addresses?.map((item) => {
          return (
            <div className=" w-full p-5 border border-headingColor flex items-center justify-between">
              <div className=" ">
                <div className="flex items-center gap-5">
                  <span className="text-black font-poppinsSemibold">
                    {item?.name}
                  </span>
                  <span className="text-black font-poppinsSemibold">
                    {item?.number}
                  </span>
                </div>
                <p className="mt-1 font-poppinsLight text-gray-500 text-sm">
                  {" "}
                  {item?.address}, {item.locality}, {item.city}, {item.state},{" "}
                  {item.pinCode}
                </p>
              </div>
              <div className=" relative ">
                <div className=" dropdown  dropdown-left">
                  <div tabIndex={0} role="button" className=" m-1">
                    <BsThreeDotsVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a> Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageAddress;
