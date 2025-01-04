import React from "react";

import { GentsBracelet } from "../../utils/icons";

const ContactSection = () => {
  return (
    <div className="my-5 w-full flex items-center justify-center">
      <div className="w-[40%]">
        <img className="w-4/5 m-auto h-[25rem]" src={GentsBracelet} alt="" />
      </div>
      <div className="w-[60%] bg-extraLight h-full"></div>
    </div>
  );
};

export default ContactSection;
