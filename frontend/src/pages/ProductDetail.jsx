import React, { useState } from "react";

import { jewellery, GentsBracelet, ethnic, kid } from "../utils/icons";

const ProductDetail = () => {
  const [imageNumber, setImageNumber] = useState(0);
  let images = [jewellery, GentsBracelet, ethnic, kid];
  return (
    <div className="w-11/12 m-auto flex items-center">
      <div className="w-1/2 flex flex-col gap-2">
        <div className="w-4/5 m-auto">
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
                className="w-full h-[88%]"
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
            className="w-[22%] h-40"
            onClick={() => {
              setImageNumber(0);
            }}
            src={images[0]}
            alt=""
          />
          <img
            className="w-[22%] h-40"
            onClick={() => {
              setImageNumber(1);
            }}
            src={images[1]}
            alt=""
          />
          <img
            className="w-[22%] h-40"
            onClick={() => {
              setImageNumber(2);
            }}
            src={images[2]}
            alt=""
          />
          <img
            className="w-[22%] h-40"
            onClick={() => {
              setImageNumber(3);
            }}
            src={images[3]}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col w-1/2"></div>
    </div>
  );
};

export default ProductDetail;
