import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Grid, 
    Divider, 
    Container,
    Alert,
    List,
    ListItem,
    ListItemText,
    CircularProgress
  } from '@mui/material';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import PaymentIcon from '@mui/icons-material/Payment';
  
  const AuctionCheckoutBox = ({ 
    auctionData, 
    loading, 
    error, 
    onPaypalCheckout,
    photoUrl 
  }) => {
    if (!auctionData) {
      return (
        <Container maxWidth="lg">
          <Alert severity="info">Auction data not available</Alert>
        </Container>
      );
    }
  
    const calculateTotalAmount = () => {
      const winningBidAmount = parseFloat(auctionData.winningBid?.amount || 0);
      const tax = winningBidAmount * 0.1; // Example 10% tax
      return (winningBidAmount + tax).toFixed(2);
    };
  
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#ff8c00' // Updated color
            }}
          >
            Checkout - Won Auction
          </Typography>
  
          <Grid container spacing={4}>
            {/* Left Column - Auction Details */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={3}>
                  {/* Image */}
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      position: 'relative',
                      paddingTop: '100%',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}>
                      <img
                        src={photoUrl || '/auction-placeholder.png'}
                        alt={auctionData.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
  
                  {/* Details */}
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {auctionData.title}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {auctionData.description}
                    </Typography>
  
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body1">
                        Winning Bid: ${auctionData.winningBid?.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
  
            {/* Right Column - Payment Summary */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Order Summary
                </Typography>
  
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Winning Bid" />
                    <Typography variant="body1">
                      ${auctionData.winningBid?.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Tax (10%)" />
                    <Typography variant="body1">
                      ${(auctionData.winningBid?.amount * 0.1).toFixed(2)}
                    </Typography>
                  </ListItem>
  
                  <Divider sx={{ my: 2 }} />
  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Total Amount" 
                      primaryTypographyProps={{ 
                        variant: 'h6', 
                        fontWeight: 'bold' 
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      ${calculateTotalAmount()}
                    </Typography>
                  </ListItem>
                </List>
  
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={onPaypalCheckout}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    backgroundColor: '#ff8c00', // Updated color
                    '&:hover': {
                      backgroundColor: '#e57c00' // Darker shade for hover
                    }
                  }}
                >
                  {loading ? 'Processing...' : 'Pay with PayPal'}
                </Button>
  
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  };
  
  export default AuctionCheckoutBox;
  