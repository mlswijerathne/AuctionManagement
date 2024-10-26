import { useTheme } from "@emotion/react";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Skeleton,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Tag, Gavel } from 'lucide-react';

const AllAuctionsBox = ({ 
  auctions, 
  error, 
  loading, 
  filters, 
  onFilterChange,
  onSearch,
  searchTerm 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getTimeLeftString = (timeLeft) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4
          }}
        >
          <Typography 
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Discover Auctions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Tag size={20} />}
            sx={{ 
              background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(255, 140, 0, 0.3)',
            }}
            onClick={() => navigate('/addauction')}
          >
            Create Auction
          </Button>
        </Box>

        {/* Filters Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '16px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search auctions..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
                }}
                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sort}
                  label="Sort By"
                  onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value="endTime">End Time</MenuItem>
                  <MenuItem value="price">Price: High to Low</MenuItem>
                  <MenuItem value="popularity">Most Bids</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Auctions Grid */}
        <Grid container spacing={3}>
          {loading ? (
            [...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
                <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : auctions.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">
                No auctions found matching your criteria.
              </Alert>
            </Grid>
          ) : (
            auctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={auction.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                    <CardMedia
                      component="img"
                      image={auction.photoUrl || "/auction-placeholder.png"}
                      alt={auction.title}
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: '#f8f9fa',
                        padding: '16px',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {auction.title}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {auction.highestBid > auction.startingPrice ? 'Highest Bid:' : 'Starting Price:'}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
                      ${auction.highestBid > auction.startingPrice 
                        ? auction.highestBid.toLocaleString() 
                        : auction.startingPrice.toLocaleString()}
                    </Typography>
                  </Box>

                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Chip
                          icon={<Clock size={16} />}
                          label={getTimeLeftString(auction.timeLeft)}
                          size="small"
                          sx={{ 
                            backgroundColor: auction.timeLeft < 86400000 ? '#ff6b6b' : '#4CAF50',
                            color: 'white'
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                      <Chip
                        icon={<Gavel size={16} />}
                        label={`${auction.bidsCount ?? 0} bids`}
                        size="small"
                        sx={{ backgroundColor: '#f8f9fa' }}
                      />
                      </Grid>
                    </Grid>

                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        mb: 2,
                        height: '40px'
                      }}
                    >
                      {auction.description}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                    <Button 
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/auctiondetails/${auction.id}`)}
                      sx={{ 
                        background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
                        borderRadius: '8px',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff6b00 0%, #ff5500 100%)'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default AllAuctionsBox;