import Joi, { func } from "joi";
import { Profiler } from "react";



class UpdateAccountDto{
    firstName = "";
    lastName = "";
    DOB = "";
    contactNumber = "";
    adress = "";
   
}

export function validateUpdateAccountDto(updateAccountDto){

    const schema = Joi.object({
        firstName: Joi.string().min(4).max(255),
        lastName: Joi.string().min(4).max(255),
        DOB: Joi.date().max("now").required(),
        contactNumber: Joi.string().min(10),
        address: Joi.string(255)
       
    })
    return schema.validate(updateAccountDto);
}

export default UpdateAccountDto;