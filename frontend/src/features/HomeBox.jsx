import React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import react-slick

// Sample car data
const cars = [
  {
    id: 1,
    name: 'Car Model A',
    image: '/path/to/car1.jpg', // Replace with actual image path
    description: 'A sleek and modern car with great features.',
  },
  {
    id: 2,
    name: 'Car Model B',
    image: '/path/to/car2.jpg', // Replace with actual image path
    description: 'An elegant sedan with top-notch performance.',
  },
  {
    id: 3,
    name: 'Car Model C',
    image: '/path/to/car3.jpg', // Replace with actual image path
    description: 'A powerful SUV built for adventure and comfort.',
  },
  {
    id: 4,
    name: 'Car Model D',
    image: '/path/to/car4.jpg', // Replace with actual image path
    description: 'A compact car that offers efficiency and style.',
  },
  {
    id: 5,
    name: 'Car Model E',
    image: '/path/to/car5.jpg', // Replace with actual image path
    description: 'A hybrid car that combines performance and eco-friendliness.',
  },
  {
    id: 6,
    name: 'Car Model F',
    image: '/path/to/car6.jpg', // Replace with actual image path
    description: 'A luxury sports car designed for speed and elegance.',
  },
  {
    id: 7,
    name: 'Car Model G',
    image: '/path/to/car7.jpg', // Replace with actual image path
    description: 'A rugged pickup truck for both work and play.',
  },
  {
    id: 8,
    name: 'Car Model H',
    image: '/path/to/car8.jpg', // Replace with actual image path
    description: 'A classic car that never goes out of style.',
  },
];

const HomeBox = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container sx={{ padding: 0, backgroundColor: '#fff' }} maxWidth="false">
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
          Welcome to Car Auction
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#444' }}>
          Discover your dream car with the best deals and auctions!
        </Typography>

        <Button
          component={Link}
          to="/auctions"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#ff8c00',
            color: 'white',
            "&:hover": {
              backgroundColor: '#e07b00',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          View Auctions
        </Button>

        {/* Carousel Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
            Featured Cars
          </Typography>

          <Slider {...settings}>
            {cars.map((car) => (
              <div key={car.id}>
                <Card sx={{ maxWidth: 300, margin: '0 auto' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={car.image}
                    alt={car.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeBox;





