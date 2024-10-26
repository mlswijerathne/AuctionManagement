import Joi from "joi";

class CreateAuctionDto {
    title = "";
    description = "";
    startingPrice = "";
    startTime = "";
    endTime = "";
    auctionPicturePath = "";
}

export function validateCreateAuctionDto(createAuctionDto) {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'string.empty': 'Title is required',
            'any.required': 'Title is required'
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Description is required',
            'any.required': 'Description is required'
        }),
        startingPrice: Joi.number().positive().required().messages({
            'number.base': 'Starting price must be a number',
            'number.positive': 'Starting price must be positive',
            'any.required': 'Starting price is required'
        }),
        startTime: Joi.date().iso().required().messages({
            'date.base': 'Start time must be a valid date',
            'any.required': 'Start time is required'
        }),
        endTime: Joi.date().iso().greater(Joi.ref('startTime')).required().messages({
            'date.base': 'End time must be a valid date',
            'date.greater': 'End time must be after start time',
            'any.required': 'End time is required'
        }),
        auctionPicturePath: Joi.required().messages({
            'any.required': 'Auction picture is required'
        })
    });

    const validationResult = schema.validate(createAuctionDto, { abortEarly: false });
    return validationResult.error;
}

export default CreateAuctionDto;