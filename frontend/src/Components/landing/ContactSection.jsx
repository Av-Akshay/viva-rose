import React from "react";

import { GentsBracelet } from "../../utils/icons";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <div className="w-full my-10">
      <div className="w-4/5 m-auto flex flex-col items-center gap-5 overflow-hidden">
        <h1 className=" text-headingColor font-poppinsBold text-5xl text-center ">
          Connect with us
        </h1>
        <p className="px-5 text-headingColor font-poppinsLight text-lg text-center relative after:content-[''] after:w-full after:h-1 after:bg-headingColor after:absolute after:top-1/2 after:-right-full before:content-[''] before:w-full before:h-1 before:bg-headingColor before:absolute before:top-1/2 before:-left-full">
          We're here for you, ready to help whenever you need us.
        </p>
      </div>
      <div className="my-10 w-4/5 m-auto flex items-center  justify-center h-[30rem]">
        <div className="w-[40%] h-full">
          <img className="w-full h-full m-auto " src={GentsBracelet} alt="" />
        </div>
        <div className="w-[60%] bg-extraLight h-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
