import axiosClient from "./axios";
import { ApiResponse } from "../types";

const getData  = async () => {
  const response = await axiosClient.get<ApiResponse>("/posts");
  return response;
};

export default getData;
