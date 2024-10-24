import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert } from "@mui/material";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import AuctionService from "../services/auctionService";
import AuctionDetailsBox from "../features/AuctionDetailsBox";

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const response = await AuctionViewModel.getAuction(id);
        
        console.log('Auction data response:', response);

        // Check if response is an error object from ErrorMessage class
        if (response && typeof response === 'object' && 'error' in response) {
          setError(response.error);
          return;
        }

        // If we get here, we have valid auction data
        setAuctionData(response);
        
        // Only fetch photo if we have valid auction data
        try {
          const photoResponse = await AuctionService.getAuctionPhoto(id);
          if (photoResponse && typeof photoResponse === 'string') {
            setPhotoUrl(photoResponse);
          }
        } catch (photoErr) {
          console.warn('Failed to fetch photo:', photoErr);
          // Don't set error state for photo failure
        }

      } catch (err) {
        console.error('Error fetching auction details:', err);
        setError('Failed to fetch auction details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    } else {
      setError('Invalid auction ID');
      setLoading(false);
    }
  }, [id]);

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!auctionData) {
    return (
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Alert severity="info">No auction data available</Alert>
      </Box>
    );
  }

  return <AuctionDetailsBox auctionData={auctionData} photoUrl={photoUrl} />;
};

export default AuctionDetailsPage;