import React from "react";

import { loginPoster } from "../utils/icons";
import { Button, Input } from "../Components/index";
import useConfirm from "../hooks/useConfirm";

const ConfirmPassword = () => {
  const {
    handleSubmit,
    register,
    submitForm,
    message,
    minUppercasePattern,
    minLowercasePattern,
    minNumberPattern,
    minSpecialCharPattern,
    errors,
    watch,
  } = useConfirm();

  const newPassword = watch("newPassword");

  return (
    <div className="w-11/12 mx-auto my-10 grid grid-rows-1 grid-cols-2 place-content-center h-[80.7vh] max-md:h-auto max-md:gap-5 max-md:grid-cols-1 max-md:grid-rows-2 ">
      <div className="flex flex-col gap-5 place-content-center w-4/5 m-auto max-md:row-span-2 max-md:order-2">
        <div className="flex items-center gap-5">
          <h1
            className={`text-5xl text-headingColor capitalize font-poppinsSemibold`}
          >
            Reset Password.
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          <Input
            label={"New Password"}
            placeholder={"New password "}
            type={"password"}
            {...register("newPassword", {
              required: "New Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 8 || "Password must be at least 8 characters",
                uppercase: (value) =>
                  minUppercasePattern.test(value) ||
                  "Password must contain at least one uppercase letter",
                lowercase: (value) =>
                  minLowercasePattern.test(value) ||
                  "Password must contain at least one lowercase letter",
                number: (value) =>
                  minNumberPattern.test(value) ||
                  "Password must contain at least one number",
                specialChar: (value) =>
                  minSpecialCharPattern.test(value) ||
                  "Password must contain at least one special character",
              },
            })}
            className={"bg-transparent py-2 px-2 w-full"}
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
          )}
          <Input
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            type={"password"}
            {...register("confirmNewPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className={"bg-transparent py-2 px-2 w-full"}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmNewPassword.message}
            </p>
          )}
          <Button type="submit" className="py-2">
            Change Password
          </Button>
        </form>
      </div>
      <div className="place-content-center max-md:order-1 max-md:flex max-md:items-center max-md:justify-center ">
        <img
          className="w-full h-[100%] max-md:w-4/5 "
          src={loginPoster}
          alt="home"
        />
      </div>
    </div>
  );
};

export default ConfirmPassword;
