import { Email, Password } from "@mui/icons-material";
import Joi from "joi";

class RegisterAccountDto {
    username = "";
    email = "";
    firstName = "";
    lastName = "";
    password = "";  
    DOB = new Date();
    ContactNumber = "";
    address = ""
}

export function validateRegisterAccountDto(registerAccountDto) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        firstName: Joi.string().min(4).max(255),
        lastName: Joi.string().min(4).max(255),
        password: Joi.string().min(5).max(255).required(),
        DOB: Joi.date().max("now").required(),
        ContactNumber: Joi.string().min(10),
        address: Joi.string().max(255)
        
    })
    return schema.validate(registerAccountDto);
}

export default RegisterAccountDto;