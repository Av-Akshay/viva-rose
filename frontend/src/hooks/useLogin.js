import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const submitForm = async (data) => {
    // try {
    //   const response = await axiosInstance.post("/userauth/login", data);
    //   if (response?.statusText === "OK") {
    //     alert("OTP sent successfully. Please check you email");
    //     navigate("/otp");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error?.status === 400) {
    //     alert(error?.response?.data?.error);
    //   }
    //   if (error?.status === 404) {
    //     alert(error?.response?.data?.error);
    //   }
    // }
  };

  const minUppercasePattern = /[A-Z]+/;
  const minLowercasePattern = /[a-z]+/;
  const minNumberPattern = /[0-9]+/;
  const minSpecialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  return {
    handleSubmit,
    register,
    submitForm,
    minUppercasePattern,
    minLowercasePattern,
    minNumberPattern,
    minSpecialCharPattern,
    errors,
    watch,
  };
};

export default useLogin;
