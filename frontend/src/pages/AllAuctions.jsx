// AllAuctions.jsx

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
              const [photoUrl, bidHistory] = await Promise.all([
                AuctionService.getAuctionPhoto(auction.id),
                BidService.getBidHistory(auction.id)
              ]);

              // Calculate bids count and highest bid
              const bidsCount = Array.isArray(bidHistory) ? bidHistory.length : 0;
              const highestBid = bidsCount > 0 
                ? Math.max(...bidHistory.map(bid => bid.amount))
                : auction.startingPrice;

              return {
                ...auction,
                photoUrl: photoUrl.error ? null : photoUrl,
                timeLeft: new Date(auction.endTime) - new Date(),
                bidsCount: bidsCount,
                highestBid: highestBid
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
        return auction.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filteredAuctions;
  };

  return (
    <AllAuctionsBox
      auctions={getSortedAndFilteredAuctions()}
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