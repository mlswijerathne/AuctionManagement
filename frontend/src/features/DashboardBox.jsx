import React, { useState } from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Chip,
  Divider
} from '@mui/material';
import { Edit, Gavel, Timer, TrendingUp, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardBox = ({ 
  auctions = [], 
  userBids = [],
  loading = false, 
  error = null, 
  onEditAuction = () => {},
  onCreateAuction = () => {},
  onViewAuctionDetails = () => {}
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = (bidId) => {
    if (!bidId) {
      console.error('No bid ID provided for checkout');
      return;
    }
    navigate(`/checkout/${bidId}`);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
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

  const StatCard = ({ title, value, icon }) => (
    <Card sx={{ 
      borderRadius: '16px', 
      background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
      color: 'white',
      height: '100%'
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          {icon}
        </Box>
        <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  const getBidStatus = (bid) => {
    const isHighestBid = true; // This should be determined by comparing with auction's highest bid
    return isHighestBid ? 
      <Chip label="Highest Bid" color="success" size="small" /> : 
      <Chip label="Outbid" color="error" size="small" />;
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
      {/* Statistics Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="Active Auctions" 
            value={auctions.length}
            icon={<Package size={24} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="Active Bids" 
            value={userBids.length}
            icon={<Gavel size={24} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="Winning Bids" 
            value={userBids.filter(bid => bid.isWinning).length}
            icon={<TrendingUp size={24} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            title="Ending Soon" 
            value={auctions.filter(a => new Date(a.endTime) - new Date() < 86400000).length}
            icon={<Timer size={24} />}
          />
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="My Auctions" />
          <Tab label="My Bids" />
        </Tabs>
      </Box>

      {/* Content Sections */}
      {activeTab === 0 && (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Button 
              variant="contained"
              onClick={onCreateAuction}
              sx={{
                background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(255, 140, 0, 0.3)',
              }}
            >
              Create New Auction
            </Button>
          </Box>
          <Grid container spacing={3}>
            {auctions.map((auction) => (
              <Grid item xs={12} md={6} lg={4} key={auction.id}>
                <Card sx={{ 
                  borderRadius: '16px',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}>
                  {auction.photoUrl && (
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${auction.photoUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                      }}
                      role="img"
                      aria-label={auction.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {auction.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom noWrap>
                      {auction.description}
                    </Typography>
                    <Box 
                      display="flex" 
                      justifyContent="space-between" 
                      alignItems="center"
                      mb={2}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff8c00' }}>
                        ${auction.startingPrice}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => onEditAuction(auction.id)}
                        startIcon={<Edit />}
                        sx={{ borderColor: '#ff8c00', color: '#ff8c00' }}
                      >
                        Edit
                      </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="caption" display="block">
                          Starts
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {new Date(auction.startTime).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" display="block">
                          Ends
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {new Date(auction.endTime).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          {userBids.map((bid) => (
            <Grid item xs={12} md={6} key={bid.id}>
              <Card sx={{ 
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {bid.auctionTitle}
                    </Typography>
                    {getBidStatus(bid)}
                  </Box>
                  <Typography variant="h5" sx={{ color: '#ff8c00', fontWeight: 'bold', mb: 2 }}>
                    ${bid.amount}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" display="block">
                        Bid Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {new Date(bid.bidTime).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" display="block">
                        Auction Status
                      </Typography>
                      <Chip 
                        label={bid.auctionStatus} 
                        size="small"
                        color={bid.auctionStatus === 'Active' ? 'success' : 'default'}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      mt: 2,
                      borderColor: '#ff8c00',
                      color: '#ff8c00',
                      '&:hover': {
                        borderColor: '#ff6b00',
                        backgroundColor: 'rgba(255, 140, 0, 0.1)',
                      }
                    }}
                    onClick={() => onViewAuctionDetails(bid.auctionId)}
                  >
                    View Auction Details
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 2,
                      background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                      color: '#fff',
                    }}
                    onClick={() => handleCheckout(bid.id)}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardBox;