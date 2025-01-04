import React from "react";

import { GentsBracelet } from "../../utils/icons";
import ContactForm from "./ContactForm";
import Heading from "../Heading";
import Pera from "../Pera";

const ContactSection = () => {
  return (
    <div className="w-full my-10 bg-extraLight py-5">
      <div className="w-4/5 m-auto flex flex-col items-center gap-2 overflow-hidden">
        <Heading heading={"Connect with us"} />
        <Pera pera="We're here for you, ready to help whenever you need us." />
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
