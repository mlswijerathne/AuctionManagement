import AccountDto from "../dto/account/accountDto";

export default class AuctionMapper{

    static ToAuctionDto(data) {
        let auctionDto = new AuctionDto();
        auctionDto.title = data.title;
        auctionDto.description = data.description;
        auctionDto.startingPrice = data.startingPrice;
        auctionDto.startTime = data.startTime;
        auctionDto.endTime = data.endTime;
        auctionDto.imageUrl = data.imageUrl;

        return auctionDto;
    }
}