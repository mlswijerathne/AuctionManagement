import BidDto from '../dto/bid/bidDto';

export default class BidMapper {

    static ToBidDto(data) {
        let bidDto = new BidDto();
        bidDto.id = data.id;
        bidDto.bidAmount = data.bidAmount;
        bidDto.bidTime = data.bidTime;
        bidDto.bidderId = data.bidderId;
        bidDto.auctionId = data.auctionId;

        return bidDto;
    }

    static ToDtoList(bids){
        return bids.map(bid => this.ToBidDto(bid));
    }
}