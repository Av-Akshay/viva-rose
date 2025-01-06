import React from "react";
import { Link } from "react-router-dom";

import useSignUp from "../hooks/useSignUp";
import { loginPoster } from "../utils/icons";
import { Heading, Input } from "../Components";

const SignUp = () => {
  const {
    handleSubmit,
    message,
    register,
    submitForm,
    errors,
    minLowercasePattern,
    minNumberPattern,
    minSpecialCharPattern,
    minUppercasePattern,
  } = useSignUp();

  return (
    <div className="w-11/12 mx-auto my-10 grid grid-rows-1 grid-cols-2 place-content-center h-screen max-md:h-auto max-md:gap-5 max-md:grid-cols-1 max-md:grid-rows-2 ">
      <div className="place-content-center max-md:order-1 max-md:flex max-md:items-center max-md:justify-center ">
        <img
          className="w-full h-[40rem] max-md:w-4/5 "
          src={loginPoster}
          alt="home"
        />
      </div>
      <div className="flex flex-col gap-5 place-content-center w-4/5 m-auto max-md:row-span-2 max-md:order-2">
        <div className="flex items-center gap-5">
          <Heading
            heading="Create Your Account of Elegance"
            className="text-primary-color"
          />
          {/* <PiHandsPrayingLight className="text-5xl text-primary-color" /> */}
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          <Input
            label={"name"}
            placeholder={"Enter your name"}
            type={"text"}
            className={"font-poppinsLight bg-transparent py-2 px-2 w-full"}
            {...register("name", {
              required: true,
            })}
          />
          <Input
            className={"bg-transparent py-2 px-2 w-full"}
            label={"Email"}
            type={"email"}
            placeholder="Enter your e-mail"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9. _%-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors?.email?.message}</p>
          )}
          <Input
            label={"password"}
            placeholder={"your password here"}
            type={"password"}
            {...register("password", {
              required: true,
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
          {errors.password && (
            <p className="error-message">{errors?.password?.message}</p>
          )}
          {/* <Button
            type="submit"
            className=" font-interMedium text-white bg-slate-950 py-2 capitalize"
          >
            Sign Up
          </Button> */}
          <button
            type="submit"
            className=" font-interMedium text-white bg-headingColor font-poppinsSemibold py-2 capitalize"
          >
            Sign Up
          </button>
        </form>
        <p className="font-interRegular text-base text-slate-900 text-center">
          Already have an account?
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
