import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert, Container } from '@mui/material';
import AuctionService from '../services/auctionService';
import BidService from '../services/bidService';
import AuctionCheckoutBox from '../features/AuctionCheckoutBox';

const AuctionCheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch auction details
        const auctionResponse = await AuctionService.getAuction(id);
        if (auctionResponse.error) {
          throw new Error(auctionResponse.error);
        }

        // Fetch winning bid
        const highestBid = await BidService.getHighestBid(id);
        if (highestBid) {
          auctionResponse.winningBid = highestBid;
        }

        setAuctionData(auctionResponse);

        // Fetch auction photo
        try {
          const photoResponse = await AuctionService.getAuctionPhoto(id);
          if (typeof photoResponse === 'string') {
            setPhotoUrl(photoResponse);
          }
        } catch (photoErr) {
          console.warn('Failed to fetch photo:', photoErr);
        }

      } catch (err) {
        console.error('Error fetching auction details:', err);
        setError(err.message || 'Failed to fetch auction details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    }
  }, [id]);

  const handlePaypalCheckout = async () => {
    try {
      setProcessingPayment(true);
      setError(null);

      // Here you would typically:
      // 1. Create a PayPal order through your backend
      // 2. Get the PayPal approval URL
      // 3. Redirect to PayPal checkout

      // Example PayPal redirect (you'll need to replace with actual PayPal integration)
      const paypalOrderData = {
        amount: auctionData.winningBid.amount,
        currency: 'USD',
        items: [{
          name: auctionData.title,
          amount: auctionData.winningBid.amount
        }]
      };

      // Replace this with your actual PayPal checkout URL
      const paypalCheckoutUrl = `https://www.paypal.com/checkoutnow?token=${encodeURIComponent(JSON.stringify(paypalOrderData))}`;
      
      // Redirect to PayPal
      window.location.href = paypalCheckoutUrl;

    } catch (err) {
      console.error('Payment processing error:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <AuctionCheckoutBox
      auctionData={auctionData}
      loading={processingPayment}
      error={error}
      onPaypalCheckout={handlePaypalCheckout}
      photoUrl={photoUrl}
    />
  );
};

export default AuctionCheckoutPage;