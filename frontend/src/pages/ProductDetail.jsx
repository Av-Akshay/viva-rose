import React, { useState } from "react";
import { TbReplace, TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";

import { jewellery, GentsBracelet, ethnic, kid } from "../utils/icons";
import { jewelleryValues } from "../utils/constant";
import { AddToCart, Stars } from "../Components";

const ProductDetail = () => {
  const [imageNumber, setImageNumber] = useState(0);
  let images = [jewellery, GentsBracelet, ethnic, kid];

  return (
    <div className="w-11/12 m-auto flex my-10">
      <div className="w-[45%] flex flex-col items-center justify-center gap-2">
        <div className="w-11/12 mx-auto">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="w-full"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            <img
              className="w-full h-[25rem]"
              src={images[imageNumber]}
              alt=""
            />
          </button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl !h-[86vh]">
              <img
                className="w-full h-[86%]"
                src={images[imageNumber]}
                alt=""
              />
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div className="w-full flex items-center gap-2 justify-center">
          <img
            className="w-[16%] h-24"
            onClick={() => {
              setImageNumber(0);
            }}
            src={images[0]}
            alt=""
          />
          <img
            className="w-[16%] h-24"
            onClick={() => {
              setImageNumber(1);
            }}
            src={images[1]}
            alt=""
          />
          <img
            className="w-[16%] h-24"
            onClick={() => {
              setImageNumber(2);
            }}
            src={images[2]}
            alt=""
          />
          <img
            className="w-[16%] h-24"
            onClick={() => {
              setImageNumber(3);
            }}
            src={images[3]}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col w-[55%] p-2 gap-5">
        <h1 className="text-5xl capitalize font-poppinsSemibold ">
          {jewelleryValues?.productName}
        </h1>
        <Stars
          stars={jewelleryValues?.rating}
          review={jewelleryValues.reviews}
        />
        <p className="font-poppinsBold text-headingColor">
          Deal of the day: Rs. <span> {jewelleryValues?.price} </span>
        </p>
        <p className="font-poppinsLight text-base ">
          {jewelleryValues?.description}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam enim
          a possimus quisquam doloribus illo modi earum architecto ducimus fuga
          ullam numquam totam dolorem veniam in libero ex, iure alias laboriosam
          distinctio, explicabo praesentium, sapiente esse. Sapiente cumque
          inventore fugit voluptatum. Voluptatum cupiditate repellat illo nobis
          quam architecto adipisci vero!
        </p>
        <div className="w-full mx-auto flex items-center justify-between border-b-2 border-[#ccc] pb-2 mb-2">
          <div className=" flex items-center gap-1 font-poppinsMedium">
            <TbTruckDelivery className="text-2xl " />
            <p> + Delivery Charges </p>
          </div>

          <div className=" flex items-center gap-1 font-poppinsMedium">
            <TbReplace className="text-2xl " />
            <p>No Replacement</p>
          </div>

          <div className=" flex items-center gap-1 font-poppinsMedium">
            <MdOutlineSecurity className="text-2xl " />
            <p>1 Year Warranty</p>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2 text-lg font-poppinsLight">
          <p>
            Available:
            <span className=" font-poppinsBold">
              {" "}
              {jewelleryValues?.stock > 0 ? "In Stock" : "Not Avialable"}{" "}
            </span>
          </p>
          <p>
            ID:{" "}
            <span className=" font-poppinsBold">
              {jewelleryValues?.productCode}
            </span>
          </p>
          <p>
            weight:{" "}
            <span className=" font-poppinsBold">
              {jewelleryValues.weight} {jewelleryValues.weightUnit}{" "}
            </span>
          </p>
          <p>
            color:{" "}
            <span className=" font-poppinsBold">{jewelleryValues.colors}</span>
          </p>
        </div> */}
        <AddToCart product={jewelleryValues} />
      </div>
    </div>
  );
};

export default ProductDetail;
