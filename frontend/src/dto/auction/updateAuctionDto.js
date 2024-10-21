import Joi from "joi";

class UpdateAuctionDto {
    title = "";
    description = "";
    endTime = "";
    imageUrl = "";
}

export function validateUpdateAuctionDto(updateAuctionDto) {
    const schema = Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        endTime: Joi.date().iso().optional(),
        imageUrl: Joi.string().uri().optional()
    });

    return schema.validate(updateAuctionDto);
}
export default UpdateAuctionDto;