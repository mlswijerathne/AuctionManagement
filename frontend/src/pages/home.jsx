import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { Clock, Tag, TrendingUp, Gavel, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [popularAuctions, setPopularAuctions] = useState([]);

  const getTimeLeftString = (timeLeft) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const AuctionCard = ({ auction, featured }) => (
    <Card 
      className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <Box className="relative pt-[75%]">
        <CardMedia
          component="img"
          src={auction.photoUrl || "/placeholder.jpg"}
          alt={auction.title}
          className="absolute top-0 left-0 w-full h-full object-cover p-4 bg-gray-50"
        />
        {featured && (
          <Chip
            icon={<Star className="w-4 h-4" />}
            label="Featured"
            className="absolute top-4 right-4 bg-orange-500 text-white"
            size="small"
          />
        )}
      </Box>
      <CardContent className="p-6">
        <Typography className="text-2xl font-bold mb-2">
          {auction.title}
        </Typography>
        
        <Typography className="text-3xl font-bold text-orange-500 mb-4">
          ${auction.startingPrice}
        </Typography>

        <Grid container spacing={2} className="mb-4">
          <Grid item xs={6}>
            <Chip
              icon={<Clock className="w-4 h-4" />}
              label={getTimeLeftString(auction.timeLeft)}
              size="small"
              className={auction.timeLeft < 86400000 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<Gavel className="w-4 h-4" />}
              label={`${auction.bidsCount} bids`}
              size="small"
              className="bg-gray-100"
            />
          </Grid>
        </Grid>

        <Typography className="text-gray-600 mb-4 line-clamp-2 h-12">
          {auction.description}
        </Typography>

        <Button 
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 hover:from-orange-600 hover:to-orange-700"
          onClick={() => navigate(`/auctiondetails/${auction.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Box className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography className="text-5xl font-bold mb-6">
                Find Your Dream Car at Auction
              </Typography>
              <Typography className="text-xl mb-8 text-orange-100">
                Discover amazing deals on luxury, classic, and performance vehicles
              </Typography>
              <Button
                startIcon={<Tag />}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50"
                onClick={() => navigate('/addauction')}
              >
                Start Bidding Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img 
                src="/api/placeholder/600/400" 
                alt="Featured Cars"
                className="rounded-2xl shadow-2xl"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Auctions */}
      <Container maxWidth="lg" className="py-16">
        <Box className="mb-12">
          <Typography className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Star className="w-8 h-8 text-orange-500" />
            Featured Auctions
          </Typography>
          <Typography className="text-gray-600">
            Hand-picked premium vehicles you don't want to miss
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredAuctions.map((auction) => (
            <Grid item xs={12} sm={6} md={4} key={auction.id}>
              <AuctionCard auction={auction} featured={true} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Most Bids Section */}
      <Box className="bg-gray-100 py-16">
        <Container maxWidth="lg">
          <Box className="mb-12">
            <Typography className="text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              Most Popular Auctions
            </Typography>
            <Typography className="text-gray-600">
              Auctions generating the most excitement among bidders
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {popularAuctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} key={auction.id}>
                <AuctionCard auction={auction} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={4}>
          {[
            { label: 'Active Auctions', value: '250+', icon: <Gavel /> },
            { label: 'Registered Bidders', value: '10,000+', icon: <Tag /> },
            { label: 'Cars Sold', value: '5,000+', icon: <TrendingUp /> }
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="text-center p-6 bg-gray-50">
                <Box className="text-orange-500 mb-4">{stat.icon}</Box>
                <Typography className="text-4xl font-bold mb-2">{stat.value}</Typography>
                <Typography className="text-gray-600">{stat.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;