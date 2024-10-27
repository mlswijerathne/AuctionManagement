// authService.js
import API from "./api";

export default class AuthService {
    static async registerAccount(registerAccountDto) {
        const response = await API.post("/api/v1/accounts/register", registerAccountDto);
        return response.data;
    }

    static async loginAccount(loginAccountDto) {
        try {
            const response = await API.post("/api/v1/accounts/login", loginAccountDto);
            
            // Store the auth token from headers
            const authToken = response.headers['x-auth-token'];
            if (authToken) {
                localStorage.setItem("token", authToken);
            }

            // Store user data
            const userData = response.data;
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("userRole", userData.role);

            return userData;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            throw error;
        }
    }

    static isAdmin() {
        const userRole = localStorage.getItem("userRole");
        return userRole && userRole.toLowerCase() === "admin";
    }

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
    }
}