import React from "react";

const Heading = ({ heading, className }) => {
  return (
    <h1
      className={`text-headingColor font-poppinsBold text-5xl text-center ${className}`}
    >
      {heading}
    </h1>
  );
};

export default Heading;
