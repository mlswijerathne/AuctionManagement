using DreamBid.Models;
using DreamBid.Dtos.Bid;

namespace DreamBid.Mappers
{
    public static class BidMapper
    {
        public static Bid ToBid(CreateBidDto createBidDto, string userId)
        {
            return new Bid
            {
                Amount = createBidDto.Amount,
                AuctionId = createBidDto.AuctionId,
                UserId = userId,
                BidTime = DateTime.UtcNow,
                IsAutoBid = false
            };
        }

        public static BidDto ToDto(Bid bid)
        {
            return new BidDto
            {
                Id = bid.Id,
                Amount = bid.Amount,
                BidTime = bid.BidTime,
                AuctionId = bid.AuctionId,
                UserId = bid.UserId,
                IsAutoBid = bid.IsAutoBid,
                BidderName = bid.User?.UserName ?? "Anonymous"
            };
        }

        public static BidHistoryDto ToBidHistoryDto(List<Bid> bids)
        {
            var bidDtos = bids.Select(ToDto).ToList();
            return new BidHistoryDto
            {
                AuctionId = bids.FirstOrDefault()?.AuctionId ?? 0,
                Bids = bidDtos,
                HighestBidAmount = bidDtos.Any() ? bidDtos.Max(b => b.Amount) : 0,
                TotalBids = bidDtos.Count,
                BidTime = DateTime.UtcNow,
                UserId = bids.FirstOrDefault()?.UserId ?? ""
            };
        }
    }
}