import React from "react";

import Input from "../Input";

const AccountForm = () => {
  return (
    <form className=" flex flex-col gap-2 mx-10 my-10">
      <div
        className={`${
          true
            ? " after:content-[''] after:absolute after:h-[2.7rem] after:bg-[rgba(0,0,0,0.2)] after:z-10 after:w-full after:left-0  after:bottom-0 "
            : " "
        }  relative`}
      >
        <Input
          label="Name"
          type="text"
          placeholder="Edit your name"
          defaultValue="Akshay chauhan"
          readOnly={true}
          className={`border z-0 ${true ? "text-gray-400" : "text-black"} `}
        />
      </div>
      <div
        className={`${
          true
            ? " after:content-[''] after:absolute after:h-[2.7rem] after:bg-[rgba(0,0,0,0.2)] after:z-10 after:w-full after:left-0  after:bottom-0 "
            : " "
        }  relative`}
      >
        <Input
          type="number"
          label="Phone Number"
          placeholder="Edit your phone number"
          defaultValue="9870642178"
          readOnly={true}
          className={`border z-0 ${true ? "text-gray-400" : "text-black"} `}
        />
      </div>
      <div
        className={`${
          true
            ? " after:content-[''] after:absolute after:h-[2.7rem] after:bg-[rgba(0,0,0,0.2)] after:z-10 after:w-full after:left-0  after:bottom-0 "
            : " "
        }  relative`}
      >
        <Input
          type="email"
          label="email"
          placeholder="Edit your email"
          defaultValue="user@gmail.com"
          readOnly={true}
          className={`border z-0 ${true ? "text-gray-400" : "text-black"} `}
        />
      </div>
      <button className="bg-blue-500 text-white font-poppinsMedium px-5 py-2 rounded relative w-fit hover:bg-blue-400">
        Edit profile
      </button>
    </form>
  );
};

export default AccountForm;
