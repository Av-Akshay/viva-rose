import React from "react";

import Section from "./Section";
import { kid, men, women } from "../../utils/icons";
import GenderCard from "./GenderCard";
import { Heading, Pera } from "../index";

const ShopByGenderSection = ({ className }) => {
  return (
    <section className={`bg-transparent my-10 ${className}`}>
      <div className="w-4/5 m-auto py-5">
        <div className="w-full flex flex-col items-center gap-2">
          <Heading heading={"Shop By Gender"} />
          <Pera pera={"Shop Your Style, Your Way."} />
        </div>
        <div className="flex items-center justify-between my-5">
          <GenderCard pic={men} name="Men" />
          <GenderCard pic={kid} name="kid" />
          <GenderCard pic={women} name="women" />
        </div>
      </div>
    </section>
  );
};

export default ShopByGenderSection;
