import React from "react";

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Filters = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <span className="capitalize font-poppinsMedium text-lg text-headingColor">
          {" "}
          Type
        </span>
        <select className="select font-poppinsMedium !outline-none !border !border-black rounded-none w-full max-w-xs">
          <option disabled selected>
            Pick your favorite Jewellery
          </option>
          <option>Neckless</option>
          <option>Rings</option>
          <option>Rings</option>
          <option>Pendents</option>
          <option>Ear-rings</option>
          <option>Bracelets</option>
          <option>Anklets</option>
          <option>Toe-rings</option>
          <option>Boches and pins</option>
          <option>Jewellery sets</option>
          <option>Traditional & Ethnic</option>
          <option>Men Silver</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <details
          tabIndex={0}
          className="collapse collapse-arrow border-black  bg-transparent !px-0 py-0 !h-fit"
        >
          <summary className="collapse-title font-poppinsMedium text-lg text-headingColor !px-0 !py-0 after:!top-[0.9rem] !min-h-[2rem]">
            <label htmlFor="priceRange" className="capitalize">
              Price Range
            </label>
          </summary>
          <div className="collapse-content flex flex-col gap-2 !px-0">
            <input
              id="priceRange"
              type="range"
              min={0}
              max="100000"
              className="range range-sm"
            />
            <div className="flex w-full justify-between text-xs">
              <span className="text-headingColor">0</span>
              <span className="text-headingColor">100000</span>
            </div>
          </div>
        </details>
      </div>
      <div className="flex flex-col gap-1">
        <details
          tabIndex={0}
          className="collapse collapse-arrow border-black  bg-transparent !px-0 py-0"
        >
          <summary className="collapse-title font-poppinsMedium text-lg text-headingColor !px-0 !py-0 after:!top-[0.9rem] !min-h-[2rem]">
            Customer Rating
          </summary>
          <div className="collapse-content flex flex-col gap-2 !px-0">
            <div className="w-full flex items-center gap-2">
              <input
                id="threeStart"
                type="radio"
                name="radio-1"
                className="radio"
              />
              <label
                htmlFor="threeStart"
                className="w-full flex items-center  font-poppinsMedium"
              >
                3 <FaStar className="mx-1" /> & above
              </label>
            </div>
            <div className="w-full flex items-center gap-2">
              <input
                id="fourStar"
                type="radio"
                name="radio-1"
                className="radio"
              />
              <label
                htmlFor="fourStar"
                className="w-full flex items-center  font-poppinsMedium"
              >
                4 <FaStar className="mx-1" /> & above
              </label>
            </div>
          </div>
        </details>
      </div>
      <div className="flex flex-col gap-1">
        <details
          tabIndex={0}
          className="collapse collapse-arrow border-black  bg-transparent !px-0 py-0"
        >
          <summary className="collapse-title font-poppinsMedium text-lg text-headingColor !px-0 !py-0 after:!top-[0.9rem] !min-h-[2rem]">
            Availability
          </summary>
          <div className="collapse-content flex flex-col gap-2 !px-0">
            <div className="w-full flex items-center gap-2">
              <input
                id="availability"
                type="radio"
                name="availability"
                className="radio"
              />
              <label
                htmlFor="availability"
                className="w-full flex items-center  font-poppinsMedium"
              >
                Exclude out of stock
              </label>
            </div>
          </div>
        </details>
      </div>
    </React.Fragment>
  );
};

export default Filters;
