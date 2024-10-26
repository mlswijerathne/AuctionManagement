class BidHistoryDto {
    auctionId = ""; // Associated auction ID
    bids = []; // List of bids (array of BidDto objects)
    highestBidAmount = ""; // Highest bid amount in the auction
    totalBids = ""; // Total number of bids placed in the auction
    bidTime = ""; // Time of the last bid
}

export default BidHistoryDto;