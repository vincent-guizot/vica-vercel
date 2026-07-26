import axios from "axios";

const axiosInstance = axios.create({
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (githubToken) {
      config.headers.Authorization = `Bearer ${githubToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default axiosInstance;
