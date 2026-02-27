import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://blood-link-server-iota.vercel.app",
  withCredentials: false,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
