import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://burger-builder-fe0d0-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default axiosInstance;
