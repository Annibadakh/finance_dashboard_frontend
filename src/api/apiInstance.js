import axios from "axios";
import { triggerLogout } from "../services/authService";


const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
apiInstance.interceptors.request.use(
    (config) => {
        const strUser = localStorage.getItem("user");
        const user = JSON.parse(strUser || "null");

        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            triggerLogout();
        }
        return Promise.reject(error);
    }
);

export default apiInstance;