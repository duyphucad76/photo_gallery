import axiosInstance from "./axiosInstance";

export const getAllImages = async () => {
  const res = await axiosInstance.get("/images");
  return res.data.metadata;
};
