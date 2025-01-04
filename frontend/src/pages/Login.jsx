import React from "react";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin";
import { Heading, Pera } from "../Components";
import { Input } from "../Components/index";
import { loginPoster } from "../utils/icons";

const Login = () => {
  const {
    errors,
    handleSubmit,
    message,
    minLowercasePattern,
    minNumberPattern,
    minSpecialCharPattern,
    minUppercasePattern,
    register,
    submitForm,
  } = useLogin();

  return (
    <div className="w-11/12 mx-auto grid grid-rows-1 grid-cols-2 place-content-center h-screen max-md:h-auto max-md:gap-5 max-md:grid-cols-1 max-md:grid-rows-2">
      <div className="place-content-center max-md:order-1 max-md:flex max-md:items-center max-md:justify-center ">
        <img
          className="w-full h-[40rem] max-md:w-4/5 "
          src={loginPoster}
          alt="home"
        />
      </div>
      <div className="flex flex-col gap-10 place-content-center w-4/5 m-auto max-md:row-span-2 max-md:order-2">
        <div className="flex flex-col items-center gap-5">
          <Heading heading="Welcome Back to Timeless Elegance" />
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
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
          <Link
            to="/forgot"
            className="text-blue-500 font-interMedium capitalize text-end font-poppinsLight "
          >
            Forgot password?
          </Link>
          {/* <Button
            type="submit"
            className=" font-interMedium text-white bg-slate-950 py-2 capitalize"
          >
            Sign In
          </Button> */}
          <button
            type="submit"
            className=" font-interMedium text-white bg-headingColor font-poppinsSemibold py-2 capitalize"
          >
            Sign In
          </button>
        </form>
        {/* <p className="login-or my-5">Or</p> */}
        {/* <div className="w-full flex flex-col gap-3 ">
          <button className="w-full py-2 border border-primary-color text-base font-interRegular flex items-center justify-center gap-2 bg-[#F3F9FA] ">
            <img src={google} alt="google" />
            Sign in with Google
          </button>
          <button className="w-full py-2 border border-primary-color text-base font-interRegular flex items-center justify-center gap-2 bg-[#F3F9FA] ">
            <img src={facebookLogin} alt="google" />
            Sign in with Facebook
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
