import React from "react";
import { GiStorkDelivery } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { RiRefund2Fill, RiRadioButtonLine } from "react-icons/ri";

import {
  DashboardBarChart,
  DashboardLineChart,
  OrderCard,
} from "../Components";

const Graphs = () => {
  return (
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
  );
};

export default Graphs;
