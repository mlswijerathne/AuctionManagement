import API from "./api";

export default class AuthService {
    static async registerAccount(registerAccountDto) {
        const response = await API.post("/api/v1/accounts/register", registerAccountDto);
        return response.data;

    }

    static async loginAccount(loginAccountDto)   {

        const response = await API.post("/api/v1/accounts/login" ,loginAccountDto);
        return response.data;
        
    }
    
}