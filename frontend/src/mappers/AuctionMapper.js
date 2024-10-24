import AuctionDto from "../dto/auction/auctionDto";

export default class AuctionMapper {

    static ToAuctionDto(data) {
        let auctionDto = new AuctionDto();
        auctionDto.id = data.id;
        auctionDto.title = data.title;
        auctionDto.description = data.description;
        auctionDto.startingPrice = data.startingPrice;
        auctionDto.startTime = data.startTime;
        auctionDto.endTime = data.endTime;
        auctionDto.auctionPicturePath = data.auctionPicturePath;

        return auctionDto;
    }

    static ToDtoList(auctions){
        return auctions.map(auction => this.ToAuctionDto(auction));
    }
}