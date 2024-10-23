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
        const response = await AuctionViewModel.getAuction(id);
        
        if ('error' in response) {
          setError(response.error);
          return;
        }
        
        setAuctionData(response);
        
        // Fetch auction photo
        const photoResponse = await AuctionService.getAuctionPhoto(id);
        if (!('error' in photoResponse)) {
          setPhotoUrl(photoResponse);
        }
      } catch (err) {
        setError('Failed to fetch auction details');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
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

  return <AuctionDetailsBox auctionData={auctionData} photoUrl={photoUrl} />;
};

export default AuctionDetailsPage;