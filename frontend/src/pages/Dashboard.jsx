import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBox from '../features/DashboardBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import BidService from '../services/bidService';

const DashboardPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [auctionsResponse, bidsResponse, wonAuctionsResponse] = await Promise.all([
          AuctionViewModel.getMyAuctionsWithPhotos(),
          BidService.getUserBids(),
          BidService.getWonAuctions(),
        ]);

        if (Array.isArray(auctionsResponse)) {
          setAuctions(auctionsResponse);
        } else {
          throw new Error(auctionsResponse.error || 'Failed to fetch auctions');
        }

        if (Array.isArray(bidsResponse)) {
          setUserBids(bidsResponse);
        } else {
          throw new Error(bidsResponse.error || 'Failed to fetch bids');
        }

        if (Array.isArray(wonAuctionsResponse)) {
          setWonAuctions(wonAuctionsResponse);
        } else {
          throw new Error(wonAuctionsResponse.error || 'Failed to fetch won auctions');
        }
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

  const handleEditAuction = (auctionId) => navigate(`/auctions/edit/${auctionId}`);
  const handleCreateAuction = () => navigate('/addauction');
  const handleViewAuctionDetails = (auctionId) => navigate(`/auctions/${auctionId}`);
  const handleCheckout = (auctionId) => navigate(`/checkout/${auctionId}`);

  return (
    <DashboardBox
      auctions={auctions}
      userBids={userBids}
      wonAuctions={wonAuctions}
      loading={loading}
      error={error}
      onEditAuction={handleEditAuction}
      onCreateAuction={handleCreateAuction}
      onViewAuctionDetails={handleViewAuctionDetails}
      onCheckout={handleCheckout}
    />
  );
};

export default DashboardPage;
