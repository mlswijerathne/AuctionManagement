import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert, Container } from "@mui/material";
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
        setError(null);

        const response = await AuctionViewModel.getAuction(id);
        
        console.log('Auction data response:', response);

        if (response && typeof response === 'object' && 'error' in response) {
          setError(response.error);
          return;
        }

        setAuctionData(response);
        
        try {
          const photoResponse = await AuctionService.getAuctionPhoto(id);
          if (photoResponse && typeof photoResponse === 'string') {
            setPhotoUrl(photoResponse);
          }
        } catch (photoErr) {
          console.warn('Failed to fetch photo:', photoErr);
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
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh'
        }}
      >
        <CircularProgress sx={{ color: '#ff8c00' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error"
          sx={{
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              color: '#ff3d00'
            }
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!auctionData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="info"
          sx={{
            borderRadius: '12px'
          }}
        >
          No auction data available
        </Alert>
      </Container>
    );
  }

  return <AuctionDetailsBox auctionData={auctionData} photoUrl={photoUrl} />;
};

export default AuctionDetailsPage;