import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5189",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: function () {
        return true;
    }
})

API.interceptors.response.use(
    response => {
        const token = response.headers["x-auth-token"];
        if (token) {
            localStorage.setItem("jwtToken", token);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default API;