using System;

namespace DreamBid.Dtos.Bid
{
    public class BidDto
    {
        public int Id { get; set; } // Unique identifier for the bid
        public decimal Amount { get; set; } // Amount of the bid
        public DateTime BidTime { get; set; } // Time when the bid was placed
        public int AuctionId { get; set; } // Associated auction ID
        public string UserId { get; set; } // ID of the user who placed the bid
        public bool IsAutoBid { get; set; } // Indicates if this bid was placed as an auto bid
        public string BidderName { get; set; } // Name of the user who placed the bid
    }
}