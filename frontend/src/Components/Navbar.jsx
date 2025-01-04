import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";

import { logo } from "../utils/icons";

const Navbar = () => {
  const [token, setToken] = useState(false);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[10vh] bg-slate-950">
        <div className="w-[90%] m-auto h-full flex items-center justify-between bg-slate-950 max-sm:w-[95%] max-sm:gap-1 ">
          <div>
            <Link>
              <img
                className="w-20 h-12 max-sm:w-16 max-sm:h-10"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <search className=" flex items-center justify-between gap-2 px-2 py-1 border border-black rounded-md w-96 bg-white max-sm:w-72 max-[500px]:w-52">
            <input
              type="text"
              placeholder="Search for jewellery "
              className="outline-none border-none font-poppinsLight w-full max-sm:text-sm "
            />
            <IoSearch className="w-6 h-6 text-slate-950 max-sm:w-5 max-sm:h-5" />
          </search>
          <div className="navbar-end w-fit flex items-center justify-end basis-1 shrink max-sm:pr-5 ">
            {!token ? (
              <ul className="flex items-center gap-3 max-[500px]:gap-[0.15rem]  ">
                <li className="font-poppinsMedium text-white max-sm:text-sm">
                  <Link to={"/profile"}>Signup</Link>
                </li>
                <li className="text-white relative">
                  <Link to={"/cart"}>
                    <GiShoppingCart className="w-8 h-8" />
                    <span className="absolute font-poppinsExtraLight -top-3 -right-5 w-8 h-8 max-[500px]:w-5 max-[500]:h-5 max-[500]:text-xs bg-white grid place-content-center border-2 border-black text-slate-900 rounded-full">
                      9
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="flex gap-5 items-center max-sm:gap-2">
                <Link to="/wishlist" className="flex flex-col items-center">
                  <img className="w-5" src={heart} alt="" />
                </Link>
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 flex flex-col items-center bg-transparent border-none shadow-none"
                  >
                    <img src={profile} alt="profile" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 -left-20 p-2 shadow"
                  >
                    <li>
                      <Link to={"/profile"}>View Profile</Link>
                    </li>
                    <li>
                      <Link to={"/owned-properties"}>Owned Properties</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col relative font-poppinsMedium">
        <div className="navbar bg-base-100 w-11/12 m-auto h-[12vh] max-sm:h-[8vh] flex items-center justify-center max-lg:justify-between">
          <div className="navbar-start w-fit">
            <details className="dropdown">
              <summary
                tabIndex={0}
                role="button"
                className="btn lg:hidden max-sm:px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </summary>
              <ul className="menu dropdown-content !justify-center bg-black rounded-box z-[1] mt-3 max-lg:w-[88vw] items-center !left-0 h-[75vh] flex-col  p-2 shadow hidden max-lg:flex ">
                <li className="bg-transparent">
                  <Link
                    to={"/"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                    }
                  >
                    Necklaces and Pendants
                  </Link>
                </li>

                <li className="bg-transparent">
                  <Link
                    to={"/about"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                    }
                  >
                    Earrings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/properties"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Rings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/contact"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Bracelets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Anklets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Toe Rings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Brooches and Pins
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Jewelry Sets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Men's Silver Jewelry
                  </Link>
                </li>
              </ul>
            </details>
            {/* <Link to={"/"}>
              <img
                className="w-40 h-12 max-sm:h-12 max-xl:w-24 max-xl:h-12 max-lg:w-52 max-sm:w-32 max-[450px]:w-16 max-[450px]:h-10 max-[380px]:w-24 max-[380px]:h-8 "
                src={logo}
                alt="logo"
              />
            </Link> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className=" flex items-center gap-5  menu-horizontal px-1">
              <li className="bg-transparent">
                <Link
                  to={"/"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                  }
                >
                  Necklaces and Pendants
                </Link>
              </li>

              <li className="bg-transparent">
                <Link
                  to={"/about"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                  }
                >
                  Earrings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/properties"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Rings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/contact"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Bracelets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Anklets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Toe Rings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Brooches and Pins
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Jewelry Sets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Men's Silver Jewelry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <Dropdowns /> */}
      </div>
    </div>
  );
};

export default Navbar;
