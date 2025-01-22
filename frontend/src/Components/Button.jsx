import React from "react";

const Button = ({ id, sendEnquiry, children, type, className, ...props }) => {
  return (
    <button
      //   onClick={
      //     sendEnquiry
      //       ? () => {
      //           if (id) {
      //             sendEnquiry(`${id}`);
      //           }
      //         }
      //       : () => {}
      //   }
      {...props}
      type={type}
      className={`text-lg border border-headingColor text-headingColor hover:text-white hover:bg-headingColor font-poppinsSemibold transition-all  ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
