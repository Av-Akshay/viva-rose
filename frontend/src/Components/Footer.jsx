import React from "react";
import { Link, Links } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

import { logo } from "../utils/icons";

const Footer = () => {
  return (
    <div className="w-full bg-gray-600 py-10">
      <div className="w-11/12 mx-auto grid grid-cols-4 grid-rows-1">
        <div className="flex justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-poppinsSemibold capitalize text-white text-lg ">
              useful links
            </h2>
            <ul className="flex flex-col gap-3 font-poppinsLight text-base capitalize text-gray-300">
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>about us</Link>
              </li>
              <li>
                <Link>contact us</Link>
              </li>
              <li>
                <Link>wishlist</Link>
              </li>
              <li>
                <Link>our products</Link>
              </li>
              <li>
                <Link>Blogs</Link>
              </li>
              <li>
                <Link>Career</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-poppinsBold capitalize text-white text-lg">
              Information
            </h2>
            <ul className="flex flex-col gap-3 font-poppinsLight text-base capitalize text-gray-300">
              <li>
                <Link>Shipping Policy</Link>
              </li>
              <li>
                <Link> refund policy</Link>
              </li>
              <li>
                <Link>privacy policy</Link>
              </li>
              <li>
                <Link>terms and conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 ">
            <h2 className="capitalize text-lg font-poppinsBold text-white">
              {" "}
              Reach Out to us
            </h2>
            <div className="flex flex-col gap-3 text-lg font-poppinsLight">
              <p className="flex items-center gap-2 text-gray-300">
                <span>
                  {" "}
                  <TfiEmail />{" "}
                </span>
                user@gamil.com
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span>
                  {" "}
                  <MdOutlineLocalPhone />{" "}
                </span>
                +91 1234567890
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" flex flex-col gap-5">
            <Link>
              <img
                className=" border border-white w-36 h-32 rounded"
                src={logo}
                alt="logo"
              />
            </Link>
            <div className="flex flex-col gap-5">
              <h2 className="capitalize text-gray-300 font-poppinsMedium text-lg">
                {" "}
                Follow us on :-{" "}
              </h2>
              <div className="flex gap-5 items-center">
                <FaXTwitter className="w-6 h-6 text-gray-300 font-poppinsLight" />
                <FaInstagram className="w-6 h-6 text-gray-300 font-poppinsLight" />
                <FaFacebook className="w-6 h-6 text-gray-300 font-poppinsLight" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
