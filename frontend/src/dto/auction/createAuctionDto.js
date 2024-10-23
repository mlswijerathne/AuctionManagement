import Joi from "joi";

class CreateAuctionDto {
    title = "";
    description = "";
    startingPrice = "";
    startTime = "";
    endTime = "";
    auctionPicturePath = "";

}

export function validateCreateAuctionDto(createAuctionDto){
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startingPrice: Joi.number().positive().required(),
        startTime: Joi.date().iso().required(),
        endTime: Joi.date().iso().required(),
        auctionPicturePath: Joi.required()

    });

    return schema.validate(createAuctionDto);
}
export default CreateAuctionDto;