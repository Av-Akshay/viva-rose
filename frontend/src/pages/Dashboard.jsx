import React from "react";
import { IoIosNotifications } from "react-icons/io";

import { Link, NavLink, Outlet } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import { CategoryRadioButton } from "../Components";

const Dashboard = () => {
  const { activePath, setActivePath } = useDashboard();
  return (
    <div className=" bg-gray-200 ">
      <div className="bg-white">
        <div className=" w-11/12 mx-auto h-[10vh] flex items-center justify-between ">
          <Link className="font-poppinsExtraBold text-2xl text-headingColor">
            <span className="text-4xl font-poppinsBoldItalic">V</span>
            iva &nbsp;&nbsp;
            <span className="text-4xl font-poppinsBoldItalic">R</span>
            ose
          </Link>
          <ul className=" flex items-center gap-5">
            <li className="text-2xl text-black">
              {/* <RiSearchLine />
               */}
              <form
                onSubmit={() => {
                  console.log("submitted");
                }}
              >
                <input
                  className="border-[0.14rem] rounded-md w-40 border-headingColor  px-5 py-1 text-base font-poppinsLight text-headingColor"
                  placeholder="Search here "
                  type="text"
                />
              </form>
            </li>
            <li className="">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-3xl text-headingColor m-1"
                >
                  <IoIosNotifications />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content !top-16 !-right-24 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="dropdown dropdown-hover dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="capitalize text-headingColor font-poppinsMedium btn m-1"
              >
                admin
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li className="font-poppinsMedium text-headingColor">
                  <a>Change Password</a>
                </li>
                <li className="font-poppinsMedium text-headingColor">
                  <a>Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[90vh] flex items-center">
        <div className="w-[20%] bg-white h-full flex flex-col items-center p-5 gap-5">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "font-poppinsMedium text-white bg-headingColor w-40 text-center py-2"
                : "font-poppinsMedium text-black bg-transparent w-40 text-center py-2"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/dashboard/allProducts"
            className={({ isActive }) =>
              isActive
                ? "font-poppinsMedium text-white bg-headingColor w-40 text-center py-2"
                : "font-poppinsMedium text-black bg-transparent w-40 text-center py-2"
            }
          >
            All Products
          </NavLink>
          <NavLink
            to="/admin/dashboard/allOrders"
            className={({ isActive }) =>
              isActive
                ? "font-poppinsMedium text-white bg-headingColor w-40 text-center py-2"
                : "font-poppinsMedium text-black bg-transparent w-40 text-center py-2"
            }
          >
            Order List
          </NavLink>
          <div className="w-4/5 flex flex-col gap-1">
            <details
              tabIndex={0}
              className="collapse collapse-arrow border-black  bg-transparent !px-0 py-0"
            >
              <summary className=" capitalize collapse-title font-poppinsMedium text-lg text-headingColor !px-0 !py-0 after:!top-[0.9rem] !min-h-[2rem]">
                categories
              </summary>
              <div className="collapse-content mt-5 flex flex-col gap-2 !px-0">
                <CategoryRadioButton
                  type={"radio"}
                  text="Neckless"
                  name="category"
                  value={"Neckless"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Rings"
                  name="category"
                  value={"Rings"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Pendents"
                  name="category"
                  value={"Pendents"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Ear-rings"
                  name="category"
                  value={"Ear-rings"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Bracelets"
                  name="category"
                  value={"Bracelets"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Anklets"
                  name="category"
                  value={"Anklets"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Toe-rings"
                  name="category"
                  value={"Toe-rings"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Boches and pins"
                  name="category"
                  value={"Boches and pins"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Jewellery sets"
                  name="category"
                  value={"Jewellery sets"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Traditional & Ethnic"
                  name="category"
                  value={"Traditional & Ethnic"}
                />
                <CategoryRadioButton
                  type={"radio"}
                  text="Men Silver"
                  name="category"
                  value={"Men Silver"}
                />
              </div>
            </details>
          </div>
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
