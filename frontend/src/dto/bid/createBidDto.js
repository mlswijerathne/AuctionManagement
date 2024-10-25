import Joi from "joi";
class CreateBidDto {
    amount = 0; // Amount of the bid
    auctionId = 0.0; // Associated auction ID
}

export function validateCreateBidDto(createBidDto) {
    const schema = Joi.object({
        amount: Joi.number().positive().required().messages({
            'number.base': 'Bid amount must be a number',
            'number.positive': 'Bid amount must be positive',
            'any.required': 'Bid amount is required'
        }),
        auctionId: Joi.string().required().messages({
            'string.empty': 'Auction ID is required',
            'any.required': 'Auction ID is required'
        })
    });

    const validationResult = schema.validate(createBidDto, { abortEarly: false });
    return validationResult.error;
}

export default CreateBidDto;