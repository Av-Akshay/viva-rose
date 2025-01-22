import { useState } from "react";

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
// import { handelSetToken } from "../store/slice";
// import { useDispatch } from "react-redux";

// import axiosInstance from "../utils/axiosInstance";

const useForgot = () => {
  //   const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = async (data) => {
    // setMessage("");
    // try {
    //   const response = await axiosInstance.post(
    //     "/userauth/forget-password",
    //     data
    //   );
    //   console.log(response);
    //   if (response?.data?.data?.response?.success === true) {
    //     alert("OTP send successfully please check you mail");
    //     localStorage.setItem("forgot", true);
    //     navigate("/otp");
    //     // window.location.reload();
    //   } else if (response?.data.data.response.success === false) {
    //     alert(response?.data?.data?.response?.message);
    //   }
    // } catch (message) {
    //   console.log(`forgot form error ${message.message}`);
    //   setMessage(message.message);
    //   alert(message.message);
    //   reset();
    // }
  };

  return {
    handleSubmit,
    register,
    submitForm,
    message,
    errors,
  };
};

export default useForgot;
