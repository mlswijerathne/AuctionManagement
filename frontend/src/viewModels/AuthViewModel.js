import { validateRegisterAccountDto } from "../dto/auth/registerAccountDto";
import AuthService from "../services/authService";
import ErrorMessage from "./ErrorViewModel";
import AccountMapper from '../mappers/AccountMapper';
import { validateLoginAccountDto } from "../dto/auth/loginAccountDto";

export default class AuthViewModel {
    static async registerAccount(registerAccountDto) {
        const { error } = validateRegisterAccountDto(registerAccountDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response = await AuthService.registerAccount(registerAccountDto);
        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return AccountMapper.ToAccountDto(response);
    }
     
    static async loginAccount(loginAccountDto){
        const {error} = validateLoginAccountDto(loginAccountDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response =await AuthService.loginAccount(loginAccountDto);
        if("error"in response)
        {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        
        // Store user ID in localStorage after successful login
        if (response.id) {
            localStorage.setItem('userId', response.id);
        }

        return AccountMapper.ToAccountDto(response);

    }




}