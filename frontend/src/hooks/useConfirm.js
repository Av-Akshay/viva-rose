import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";

const useConfirm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const submitForm = async (data) => {
    setMessage("");

    // try {
    //   const response = await axiosInstance.put("/reset-password", data);
    //   console.log(response);

    //   if (response?.data?.success === true) {
    //     alert(response?.data?.data);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("forgot");
    //     navigate("/signin");
    //   }
    // } catch (message) {
    //   console.log(message);

    //   console.log(`confirm password form error ${message.message}`);
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
    watch,
  };
};

export default useConfirm;
