import React, { useState } from "react";

const useAddProduct = () => {
  const [productImage, setProductImage] = useState("");

  const handlerChange = (event) => {
    setProductImage(event.target.files);
  };
  return {
    productImage,
    handlerChange,
  };
};

export default useAddProduct;
