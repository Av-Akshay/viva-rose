import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { addAllProducts } from "../store/slice";
import axiosInstance from "../utils/axiosInstance";

const fetchJewellery = async () => {
  try {
    const response = await axiosInstance.get("/search/jewellery");
    return response.data; // Assuming the API returns the data in the response body
  } catch (error) {
    // Throwing the error to let React Query handle it
    throw new Error(error.response || "Failed to fetch jewellery data");
  }
};

const useGetAllJewellery = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.silverJewellery.allProducts);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["jewellery"],
    queryFn: fetchJewellery,
  });

  if (data && data?.data.length > 0) {
    dispatch(addAllProducts(data?.data));
  }
  return {
    error,
    isError,
    isLoading,
    products,
  };
};

export default useGetAllJewellery;
