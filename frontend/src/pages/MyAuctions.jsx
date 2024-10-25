// MyAuctions.jsx
import { useEffect, useState, useCallback } from "react";
import { Box, CircularProgress, Alert, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AuctionViewModel from "../viewModels/AuctionViewModel";
import MyAuctionsBox from "../features/MyAuctionsBox";

const MyAuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMyAuctions = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log('No user ID found, redirecting to login');
        navigate('/login');
        return;
      }

      setLoading(true);
      setError(null);
      
      console.log('Fetching auctions...');
      const response = await AuctionViewModel.getMyAuctionsWithPhotos();
      
      if ('error' in response) {
        console.error('Error fetching auctions:', response.error);
        setError(response.error);
        return;
      }
      
      if (!Array.isArray(response)) {
        console.error('Invalid response format:', response);
        setError('Invalid response format from server');
        return;
      }

      console.log('Auctions fetched successfully:', response);
      setAuctions(response);
      
    } catch (err) {
      console.error('Error in fetchMyAuctions:', err);
      setError('Failed to fetch auctions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchMyAuctions();

    return () => {
      // Cleanup function to revoke object URLs
      auctions.forEach(auction => {
        if (auction?.photoUrl) {
          URL.revokeObjectURL(auction.photoUrl);
        }
      });
    };
  }, [fetchMyAuctions]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Alert severity="error" 
               action={
                 <Button color="inherit" size="small" onClick={fetchMyAuctions}>
                   Retry
                 </Button>
               }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (auctions.length === 0) {
    return (
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Alert severity="info">You don't have any auctions yet.</Alert>
      </Box>
    );
  }

  return <MyAuctionsBox auctions={auctions} />;
};

export default MyAuctionsPage;