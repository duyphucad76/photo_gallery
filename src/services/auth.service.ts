import axios from "axios";

const API_BASE_URL = "http://localhost:3089/api";

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_BASE_URL}/account/login`, {
    username,
    password,
  });

  const accessToken = res.data?.metadata?.tokens?.accessToken;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return res.data;
};
