import { useEffect, useState } from 'react';
import AllAuctionsBox from '../features/AllAuctionsBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import AuctionService from '../services/auctionService';
import BidService from '../services/bidService';

const AllAuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sort: 'endTime',
    category: 'all',
  });

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await AuctionViewModel.getAllAuctions();
        if ("error" in response) {
          setError(response.error);
          return;
        }

        const auctionsWithDetails = await Promise.all(
          response.map(async (auction) => {
            if (!auction.id) {
              console.error('Invalid auction ID:', auction);
              return {
                ...auction,
                photoUrl: null,
                highestBid: auction.startingPrice,
                bidsCount: 0
              };
            }
    
            try {
              // Fetch photo and highest bid simultaneously
              const [photoUrl, highestBidResponse] = await Promise.all([
                AuctionService.getAuctionPhoto(auction.id),
                BidService.getHighestBid(auction.id)
              ]);

              // Get bid history for count
              const bidHistory = await BidService.getBidHistory(auction.id);

              const highestBidAmount = highestBidResponse && !highestBidResponse.error 
                ? highestBidResponse.amount 
                : auction.startingPrice;

              const bidCount = bidHistory && Array.isArray(bidHistory) ? bidHistory.length : 0;

              return {
                ...auction,
                photoUrl: photoUrl.error ? null : photoUrl,
                timeLeft: new Date(auction.endTime) - new Date(),
                bidsCount: bidCount,
                highestBid: highestBidAmount
              };
            } catch (err) {
              console.error(`Error fetching details for auction ${auction.id}:`, err);
              return {
                ...auction,
                photoUrl: null,
                highestBid: auction.startingPrice,
                bidsCount: 0
              };
            }
          })
        );

        setAuctions(auctionsWithDetails);
      } catch (err) {
        setError('Failed to fetch auctions. Please try again later.');
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  const getSortedAndFilteredAuctions = () => {
    let filteredAuctions = [...auctions];

    // Apply search filter
    if (searchTerm) {
      filteredAuctions = filteredAuctions.filter(auction => {
        return (
          auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          auction.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply sorting
    switch (filters.sort) {
      case 'endTime':
        filteredAuctions.sort((a, b) => a.timeLeft - b.timeLeft);
        break;
      case 'price':
        filteredAuctions.sort((a, b) => b.highestBid - a.highestBid);
        break;
      case 'popularity':
        filteredAuctions.sort((a, b) => b.bidsCount - a.bidsCount);
        break;
      case 'newest':
        filteredAuctions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filteredAuctions;
  };

  const sortedAndFilteredAuctions = getSortedAndFilteredAuctions();

  return (
    <AllAuctionsBox 
      auctions={sortedAndFilteredAuctions}
      error={error} 
      loading={loading}
      filters={filters}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      searchTerm={searchTerm}
    />
  );
};

export default AllAuctionsPage;