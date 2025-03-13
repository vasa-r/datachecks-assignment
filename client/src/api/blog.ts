import { AxiosError } from "axios";
import apiClient from "./axios-config";

export const createBlog = async (
  title: string,
  subtitle: string,
  image_url: string,
  content: string
) => {
  try {
    const response = await apiClient.post("/blog", {
      title,
      subtitle,
      image_url,
      content,
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

export const getAllBlogs = async (skip: number, limit: number = 10) => {
  try {
    const response = await apiClient.get(
      `/blog/all?skip=${skip}&limit=${limit}`
    );

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

export const getUserBlogs = async (skip: number, limit: number = 10) => {
  try {
    const response = await apiClient.get(
      `/blog/user-blogs?skip=${skip}&limit=${limit}`
    );

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

export const getBlogById = async (id: string) => {
  try {
    const response = await apiClient.get(`/blog/${id}`);
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

export const updateBlogById = async (
  id: string,
  data: Partial<{
    title: string;
    subtitle: string;
    imageUrl: string;
    content: string;
  }>
) => {
  try {
    const response = await apiClient.patch(`/blog/${id}`, data);
    return {
      success: true,
      message: "Blog updated successfully",
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      message: err.response?.data || "Failed to update blog",
      data: null,
      status: err.response?.status || 500,
    };
  }
};

export const deleteBlogById = async (id: string) => {
  try {
    const response = await apiClient.delete(`/blog/${id}`);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred while deleting the blog",
      status: err.response?.status || 500,
    };
  }
};
