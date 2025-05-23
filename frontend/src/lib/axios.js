import axios from "axios"

const BASE_URL = import.meta.env.Mode === "development" ? "http://localhost:5001/api" : "/api"


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
    timeout: 10000  // send cokkies with the request
});

