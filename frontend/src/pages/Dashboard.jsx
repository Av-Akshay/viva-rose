import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { GiStorkDelivery } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { RiRefund2Fill, RiRadioButtonLine } from "react-icons/ri";

import { logo } from "../utils/icons";
import { Link } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import {
  CategoryRadioButton,
  DashboardLineChart,
  OrderCard,
  DashboardBarChart,
  DashboardAllProducts,
  DashboardOrderList,
} from "../Components";
import { act } from "react-dom/test-utils";

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
                  className="border-[0.14rem] rounded-md w-40 border-black px-5 py-1 text-base font-poppinsLight"
                  placeholder="Search here "
                  type="text"
                />
              </form>
            </li>
            <li className="text-3xl text-black">
              <IoIosNotifications />
            </li>
            <li className=" btn font-poppinsMedium capitalize">admin</li>
          </ul>
        </div>
      </div>
      <div className="h-[79.93vh] flex">
        <div className="w-[20%] bg-white h-full flex flex-col items-center p-5 gap-5">
          <button
            onClick={() => {
              setActivePath("dashboard");
            }}
            className={`${
              activePath === "dashboard"
                ? "text-white bg-headingColor "
                : " text-black"
            } w-full transition-all font-poppinsMedium px-6 py-2 rounded-xl `}
          >
            {" "}
            Dashboard{" "}
          </button>
          <button
            onClick={() => {
              setActivePath("all-products");
            }}
            className={`${
              activePath === "all-products"
                ? "text-white bg-headingColor "
                : " text-black"
            } w-full transition-all font-poppinsMedium px-6 py-2 rounded-xl `}
          >
            {" "}
            All Products{" "}
          </button>
          <button
            onClick={() => {
              setActivePath("all-orders");
            }}
            className={`${
              activePath === "all-orders"
                ? "text-white bg-headingColor "
                : " text-black"
            } w-full transition-all font-poppinsMedium px-6 py-2 rounded-xl `}
          >
            Order List
          </button>
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

        {activePath === "dashboard" && (
          <div className="w-full flex flex-col gap-5 p-5">
            <h1 className="text-headingColor font-poppinsBold text-3xl ">
              Dashboard
            </h1>
            {/* ---------------- orders status ------------------------ */}
            <div className="flex items-center justify-center gap-10">
              <OrderCard
                orderType={"successful orders"}
                orders="2,867"
                Icon={GiStorkDelivery}
              />
              <OrderCard
                orderType={"cancelled orders"}
                orders="867"
                Icon={MdCancel}
              />
              <OrderCard
                orderType={"Refund orders"}
                orders="567"
                Icon={RiRefund2Fill}
              />
              <OrderCard
                orderType={"Active orders"}
                orders="1,367"
                Icon={RiRadioButtonLine}
              />
            </div>
            {/* ----------------------- charts -------------------------- */}
            <div className="w-full h-full flex items-center">
              <div className="w-1/2 h-full p-2 ">
                <DashboardLineChart />
              </div>
              <div className="w-1/2 h-full p-2 ">
                <DashboardBarChart />
              </div>
            </div>
          </div>
        )}
        {activePath === "all-products" && <DashboardAllProducts />}
        {activePath === "all-orders" && <DashboardOrderList />}
      </div>
    </div>
  );
};

export default Dashboard;
