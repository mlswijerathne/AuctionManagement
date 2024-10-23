import Joi from "joi";

class UpdateAuctionDto {
    title = "";
    description = "";
    endTime = "";
    auctionPicturePath  = "";
}

export function validateUpdateAuctionDto(updateAuctionDto) {
    const schema = Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        endTime: Joi.date().iso().optional(),
        auctionPicturePath: Joi.string().optional()
    });

    return schema.validate(updateAuctionDto);
}
export default UpdateAuctionDto;