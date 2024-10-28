import Joi from "joi";

class CreateBidDto {
    amount = 0; // Amount of the bid
    auctionId = 0; // Associated auction ID
    ownerId = ''; // Added for owner validation
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
        }),
        ownerId: Joi.string().required().messages({
            'string.empty': 'Owner ID is required',
            'any.required': 'Owner ID is required'
        })
    });

    const validationResult = schema.validate(createBidDto, { abortEarly: false });

    // Additional validation for owner bidding
    const userId = localStorage.getItem('userId');
    if (userId && String(userId).toLowerCase() === String(createBidDto.ownerId).toLowerCase()) {
        return {
            ...validationResult.error,
            details: [{
                message: 'You cannot place a bid on your own auction',
                path: ['ownerId'],
                type: 'OWNER_BID_ATTEMPT'
            }]
        };
    }

    return validationResult.error;
}

export default CreateBidDto;