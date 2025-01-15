import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

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
              <ul className="flex items-center gap-5 max-[500px]:gap-[0.15rem]  ">
                {/* <li className="font-poppinsMedium text-white max-sm:text-sm">
                  <Link to={"/signup"}>Signup</Link>
                </li> */}
                <li className="font-poppinsMedium text-white max-sm:text-sm">
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <CgProfile className="w-7 h-7" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content !left-[-50%] menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <Link
                          to={"#"}
                          className="text-black font-poppinsMedium"
                        >
                          Account setting
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"#"}
                          className="text-black font-poppinsMedium"
                        >
                          My orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"#"}
                          className="text-black font-poppinsMedium"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* <Link to={"/profile"}>
                  
                    <CgProfile className="w-7 h-7" />{" "}
                  </Link> */}
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
    </div>
  );
};

export default Navbar;
