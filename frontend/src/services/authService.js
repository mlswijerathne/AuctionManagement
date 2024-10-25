import API from "./api";

export default class AuthService {
    static async registerAccount(registerAccountDto) {
        const response = await API.post("/api/v1/accounts/register", registerAccountDto);
        return response.data;

    }

    static async loginAccount(loginAccountDto)   {

        const response = await API.post("/api/v1/accounts/login" ,loginAccountDto);
        const { userId, ...userData } = response.data; // Adjust based on your API response structure
        localStorage.setItem("userId", userId); // Store user ID in local storage
        return userData; // Return the user data excluding the userId
        
        
    }
    
}