import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AccountForm, ManageAddress } from "../Components";

const AccountSetting = () => {
  const [toggle, setToggle] = useState("profileInfo");
  return (
    <div className="bg-gray-100">
      <div className=" w-4/5 mx-auto py-10">
        <div className="w-ful grid grid-rows-1 grid-cols-account-grid-columns gap-10">
          <div className="flex flex-col gap-8">
            <div className="p-5 border-2 h-full bg-white shadow-lg shadow-gray-400">
              <h1 className="text-2xl font-poppinsBold">Hello...</h1>
              <p className="text-headingColor font-poppinsMedium mt-5 ml-2">
                {" "}
                Akshay chauhan
              </p>
            </div>
            <ul className="flex p-5 flex-col gap-5 text-headingColor font-poppinsMedium border-2 bg-white shadow-lg shadow-gray-400 ">
              <li
                className={`${
                  toggle === "profileInfo" ? "bg-extraLight" : ""
                } py-2 cursor-pointer transition-all text-center`}
                onClick={() => {
                  setToggle("profileInfo");
                }}
              >
                Profile Information
              </li>
              <li
                className={`${
                  toggle === "manageAdd" ? "bg-extraLight" : ""
                } py-2 cursor-pointer transition-all text-center`}
                onClick={() => {
                  setToggle("manageAdd");
                }}
              >
                Manage Address
              </li>
            </ul>
          </div>
          <div className="bg-white h-full border-2 shadow-lg shadow-gray-400 p-2 ">
            {toggle === "profileInfo" ? <AccountForm /> : <ManageAddress />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
