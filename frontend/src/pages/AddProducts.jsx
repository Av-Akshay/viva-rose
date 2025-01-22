import React from "react";
import { CiImageOn } from "react-icons/ci";

import { DashboardInput } from "../Components";
import useAddProduct from "../hooks/useAddProduct";

const AddProducts = () => {
  const { handlerChange, productImage } = useAddProduct();
  let filesArray = [];
  for (const files of productImage) {
    filesArray.push(files);
  }

  return (
    <div className="w-full h-full px-5">
      <h1 className=" text-headingColor py-5 text-3xl font-poppinsBold ">
        Product Details
      </h1>
      <form className="w-full bg-white py-5 rounded-lg p-2 grid grid-cols-2 grid-rows-1 gap-5 overflow-auto ">
        <div className="flex flex-col gap-5 ">
          <DashboardInput
            label={"Product Name"}
            type={"text"}
            placeholder={"Enter Jewellery Name"}
          />
          <div className="flex flex-col gap-2">
            <label
              className="font-poppinsSemibold text-lg"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              placeholder="Type description here"
              className="border p-2 w-full border-gray-500 rounded-lg"
              name=""
              rows={"5"}
              id=""
            ></textarea>
          </div>
          <DashboardInput
            label={"Category"}
            type={"text"}
            placeholder={"Type category here"}
          />
          <DashboardInput
            label={"Brand Name"}
            type={"text"}
            placeholder={"Type brand name here"}
          />
          <div className="grid grid-cols-2 grid-rows-2 gap-5">
            <DashboardInput
              label={"SKU"}
              type={"text"}
              placeholder={"Fox-3983"}
            />
            <DashboardInput
              label={"Stock Quantity"}
              type={"number"}
              placeholder={"1258"}
            />
            <DashboardInput
              label={"Regular Price"}
              type={"number"}
              placeholder={"₹1000"}
            />
            <DashboardInput
              label={"Sale Price "}
              type={"number"}
              placeholder={"₹450"}
            />
          </div>
        </div>
        <div className="w-full h-auto flex flex-col">
          <h3 className="text-black font-poppinsSemibold text-lg">
            Product Gallery
          </h3>
          <div
            style={{ border: "3px dashed black" }}
            className="mt-3 relative flex items-center justify-center flex-col border-black w-full rounded-lg h-auto"
          >
            <p className="font-poppinsMedium text-headingColor capitalize">
              Not add more then five images
            </p>
            <CiImageOn className="w-40 h-40" />
            <input
              onChange={(e) => {
                handlerChange(e);
              }}
              className="absolute z-30 py-8 px-3 border top-[57%] -translate-y-1/2 opacity-0"
              type="file"
              accept=".jpeg, .jpg, .png"
              required
              multiple
            />
            {filesArray.length > 0 && (
              <span className="text-lg font-poppinsBold text-headingColor">
                {filesArray.length} files are available
              </span>
            )}
          </div>
          <button className="my-5 border-[0.15rem] border-white py-2 font-poppinsMedium bg-headingColor text-white">
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
