import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBox from '../features/DashboardBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import BidService from '../services/bidService';

const DashboardPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [auctionsResponse, bidsResponse] = await Promise.all([
          AuctionViewModel.getMyAuctionsWithPhotos(),
          BidService.getUserBids()
        ]);

        if (!auctionsResponse || auctionsResponse.error) {
          throw new Error(auctionsResponse.error || 'Failed to fetch auctions');
        }

        if (!bidsResponse || bidsResponse.error) {
          throw new Error(bidsResponse.error || 'Failed to fetch bids');
        }

        setAuctions(auctionsResponse);
        setUserBids(bidsResponse);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      auctions.forEach(auction => {
        if (auction?.photoUrl) {
          URL.revokeObjectURL(auction.photoUrl);
        }
      });
    };
  }, []);

  const handleEditAuction = (auctionId) => {
    navigate(`/auctions/edit/${auctionId}`);
  };

  const handleCreateAuction = () => {
    navigate('/addauction');
  };

  const handleViewAuctionDetails = (auctionId) => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <DashboardBox
      auctions={auctions}
      userBids={userBids}
      loading={loading}
      error={error}
      onEditAuction={handleEditAuction}
      onCreateAuction={handleCreateAuction}
      onViewAuctionDetails={handleViewAuctionDetails}
    />
  );
};

export default DashboardPage;