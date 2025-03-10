import { AxiosError } from "axios";
import apiClient from "./axios-config";

const registerUser = async (
  full_name: string,
  email: string,
  password: string
) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    const response = await apiClient.post("/user/signup", {
      full_name,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/user/signin`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { registerUser, loginUser };
