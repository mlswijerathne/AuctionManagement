namespace DreamBid.Dtos.Bid
{
    public class BidHistoryDto
    {
        public int AuctionId { get; set; }
        public List<BidDto> Bids { get; set; }
        public decimal HighestBidAmount { get; set; }
        public int TotalBids { get; set; }
    }
}