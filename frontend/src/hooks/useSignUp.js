import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = async (data) => {
    setMessage("");

    // try {
    //   const response = await axiosInstance.post("/users/register", data);

    //   if (response?.statusText === "Created") {
    //     alert("Otp send Successfully please check your email");
    //     navigate("/otp");
    //   }
    // } catch (message) {
    //   console.log(`register form error ${message.message}`);
    //   setMessage(message.message);
    //   alert(message.message);
    //   reset();
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
    message,
    minUppercasePattern,
    minLowercasePattern,
    minNumberPattern,
    minSpecialCharPattern,
    errors,
  };
};

export default useSignUp;
