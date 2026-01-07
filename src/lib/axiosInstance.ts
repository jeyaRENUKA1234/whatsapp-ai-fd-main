import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const session = await getSession();

    if (error.response?.status === 401 && !originalRequest._retry && session?.refreshToken) {
      originalRequest._retry = true;

      // try {
      //   const refreshResponse = await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      //     { refresh_token: session.refreshToken }
      //   );

      //   const newAccessToken = refreshResponse.data.access_token;
      //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      //   return axiosInstance(originalRequest);
      // } catch (err) {
      //   console.error("Token refresh failed:", err);
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
