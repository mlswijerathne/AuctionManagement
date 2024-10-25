import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBox from '../features/DashboardBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';

const DashboardPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await AuctionViewModel.getMyAuctionsWithPhotos();
        console.log('Auctions fetch response:', response); // Logging the response

        if (!response || response.error) {
          throw new Error(response.error || 'Failed to fetch auctions');
        }
        setAuctions(response);
      } catch (error) {
        setError(error.message); // Set the error message
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();

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

  return (
    <DashboardBox
      auctions={auctions}
      loading={loading}
      error={error}
      onEditAuction={handleEditAuction}
      onCreateAuction={handleCreateAuction}
    />
  );
};

export default DashboardPage;
