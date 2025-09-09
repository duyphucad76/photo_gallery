import axiosInstance from "./http";


export const login = async (username: string, password: string) => {
  const res = await axiosInstance.post('/account/login', {
    username,
    password,
  });

  const accessToken = res.data?.metadata?.tokens?.accessToken;
  const refreshToken = res.data?.metadata?.tokens?.refreshToken;

  const avatar = res.data?.metadata?.user?.avatar;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  if (avatar) {
    localStorage.setItem("avatar", avatar);
  }

  return res.data;
};


export const register = async (name: string, email: string, password: string) => {
  const res = await axiosInstance.post('/account/register', {
    name,
    email,
    password,
  });

  return res.data;
}

export const logout = async () => {
  try {
    await axiosInstance.delete("/account/logout");

    // Xóa token ở localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
};

