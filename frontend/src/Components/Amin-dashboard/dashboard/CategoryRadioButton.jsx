import React from "react";

const CategoryRadioButton = ({ type, name, value, text }) => {
  return (
    <div className="w-full flex items-center gap-2">
      <input
        id="threeStart"
        type={type}
        name={name}
        className="radio"
        defaultValue={value}
      />
      <label
        htmlFor="threeStart"
        className="w-full flex items-center  font-poppinsMedium"
      >
        {text}
      </label>
    </div>
  );
};

export default CategoryRadioButton;
