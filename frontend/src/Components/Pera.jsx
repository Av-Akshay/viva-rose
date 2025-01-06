import React from "react";

const Pera = ({ pera, className }) => {
  return (
    <p
      className={`px-5 text-headingColor font-poppinsLight text-lg text-center relative after:content-[''] after:w-[12rem] after:h-1 after:bg-headingColor after:absolute after:top-1/2 after:-right-[12rem] before:content-[''] before:w-[12rem] before:h-1 before:bg-headingColor before:absolute before:top-1/2 before:-left-[12rem] ${className}`}
    >
      {pera}
    </p>
  );
};

export default Pera;
