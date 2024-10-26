// AuctionDetailsBox.jsx
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert,
  Paper,
  Chip,
  Grid,
  Divider,
  Container
} from "@mui/material";
import { useState, useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";


const AuctionDetailsBox = ({ auctionData, photoUrl }) => {
  const navigate = useNavigate();


  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const isAuctionActive = () => {
    if (!auctionData) return false;

    const now = new Date();
    const startTime = new Date(auctionData.startTime);
    const endTime = new Date(auctionData.endTime);

    return now >= startTime && now <= endTime;
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(auctionData.endTime);
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return 'Auction ended';
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  const handlePlaceBidClick = () => {
    if (auctionData?.id) {
      navigate(`/bid/${auctionData.id}`);
    }
  };

  if (!auctionData) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info">Auction not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Image */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa',
                position: 'relative'
              }}
            >
              <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                <img
                  src={photoUrl || '/auction-placeholder.png'}
                  alt={auctionData.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '16px'
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {auctionData.title}
              </Typography>


              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.8
                }}
              >
                {auctionData.description}
              </Typography>

              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  borderRadius: '16px',
                  backgroundColor: '#f8f9fa',
                  mb: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Current Bid
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#ff8c00'
                        }}
                      >
                        ${parseFloat(auctionData.startingPrice).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Time Remaining
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        {getTimeRemaining()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ color: '#ff8c00' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Start Time
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(auctionData.startTime)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ color: '#ff8c00' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        End Time
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(auctionData.endTime)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {isAuctionActive() && (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handlePlaceBidClick}
                  sx={{
                    background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                    borderRadius: '8px',
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff6b00 0%, #ff5500 100%)'
                    }
                  }}
                >
                  Place Bid Now
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuctionDetailsBox;
