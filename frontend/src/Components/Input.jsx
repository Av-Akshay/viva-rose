import React from "react";

const Input = React.forwardRef(function Input(
  { label, className, placeholder, type, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label ? (
        <label className="text-headingColor font-poppinsMedium uppercase max-sm:text-sm  ">
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        className={`w-full border-[0.2rem] border-headingColor px-5 py-2 outline-none font-poppinsMedium relative ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
