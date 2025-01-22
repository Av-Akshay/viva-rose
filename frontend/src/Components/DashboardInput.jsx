import React from "react";

const DashboardInput = ({ label, type, placeholder, className, ...props }) => {
  return (
    <div>
      {label && (
        <label className="font-poppinsSemibold text-lg" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        className={`font-poppinsMedium border py-2 border-gray-500 text-sm outline-none rounded-lg px-2 input-bordered w-full ${className}`}
        id={label}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default DashboardInput;
