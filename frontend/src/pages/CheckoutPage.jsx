import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    CircularProgress,
    Alert,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Divider
} from '@mui/material';
import BidService from '../services/bidService';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import AuctionService from '../services/auctionService';

const CheckoutPage = () => {
    const [bid, setBid] = useState(null);
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const { bidId } = useParams();
    const navigate = useNavigate();

    const steps = ['Review Order', 'Payment', 'Confirmation'];

    useEffect(() => {
        const fetchAllDetails = async () => {
            try {
                if (!bidId) {
                    setError('No bid ID provided');
                    setLoading(false);
                    return;
                }
                // Fetch bid details
                const bidResponse = await BidService.getBid(bidId);
                if (bidResponse.error) {
                    throw new Error(bidResponse.error);
                }
                setBid(bidResponse);

                // Fetch auction details using AuctionViewModel
                const auctionResponse = await AuctionViewModel.getAuction(bidResponse.auctionId);
                if (auctionResponse.error) {
                    console.error('Error fetching auction:', auctionResponse);
                    throw new Error(auctionResponse.error);
                }
                setAuctionDetails(auctionResponse);

                // Fetch highest bid for the auction
                const highestBidResponse = await BidService.getHighestBid(bidResponse.auctionId);
                if (highestBidResponse) {
                    setHighestBid(highestBidResponse);
                }

                // Fetch auction photo if needed
                const photoResponse = await AuctionService.getAuctionPhoto(bidResponse.auctionId);
                if (photoResponse && !photoResponse.error) {
                    setAuctionDetails(prev => ({
                        ...prev,
                        photoUrl: photoResponse
                    }));
                }
            } catch (err) {
                console.error('Error in fetchAllDetails:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllDetails();

        // Cleanup function for photo URL
        return () => {
            if (auctionDetails?.photoUrl) {
                URL.revokeObjectURL(auctionDetails.photoUrl);
            }
        };
    }, [bidId]);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const response = await BidService.checkoutBid(bidId);
            if (response.error) {
                throw new Error(response.error);
            }
            setActiveStep(2);
            // Navigate to success page or show success message
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box maxWidth="xl" mx="auto" mt={8}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box p={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
                    Checkout
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ borderRadius: '16px', mb: 3 }}>
                            <CardContent>
                                {auctionDetails?.photoUrl && (
                                    <Box sx={{ mb: 2 }}>
                                        <img 
                                            src={auctionDetails.photoUrl} 
                                            alt={auctionDetails.title}
                                            style={{ 
                                                width: '100%', 
                                                height: 'auto', 
                                                borderRadius: '8px',
                                                maxHeight: '300px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                )}
                                <Typography variant="h6" gutterBottom>
                                    Auction Details
                                </Typography>
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="h5">
                                        {auctionDetails?.title}
                                    </Typography>
                                    <Typography color="textSecondary" sx={{ mt: 1 }}>
                                        {auctionDetails?.description}
                                    </Typography>
                                    <Typography color="primary" sx={{ mt: 2 }}>
                                        Starting Price: ${auctionDetails?.startingPrice}
                                    </Typography>
                                    {highestBid && (
                                        <Typography color="success.main" sx={{ mt: 1 }}>
                                            Current Highest Bid: ${highestBid.amount}
                                        </Typography>
                                    )}
                                    <Typography sx={{ mt: 1 }}>
                                        Your Bid Amount: ${bid?.amount}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body2" color="textSecondary">
                                    Start Date: {new Date(auctionDetails?.startTime).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    End Date: {new Date(auctionDetails?.endTime).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                            color: 'white'
                        }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Payment Summary
                                </Typography>
                                <Box sx={{ my: 2 }}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography>Bid Amount:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>${bid?.amount}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                                <Box sx={{ my: 2 }}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h6">Total:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">${bid?.amount}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCheckout}
                                    disabled={bid?.amount < highestBid?.amount}
                                    sx={{
                                        mt: 2,
                                        backgroundColor: 'white',
                                        color: '#ff8c00',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                        }
                                    }}
                                >
                                    Proceed to Payment
                                </Button>
                                {bid?.amount < highestBid?.amount && (
                                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                                        Your bid is no longer the highest bid
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CheckoutPage;