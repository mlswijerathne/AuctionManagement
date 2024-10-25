import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { BsFillClockFill } from 'react-icons/bs';

const HomeBox = () => {
  return (
    <Box className="bg-black min-h-screen text-white w-full">
      {/* Hero Section */}
      <Box className="relative bg-black py-12 px-0 md:px-0 mx-auto max-w-screen-xl">
        <Box className="text-center">
          <Typography
            variant="h3"
            className="font-bold text-white mb-4"
          >
            Best Car Marketplace
          </Typography>
          <Typography
            variant="h5"
            className="font-light text-gray-400 mb-8"
          >
            Find & Sell Your Best Car Easily & Trusted
          </Typography>
          <Typography className="text-gray-300 mb-6">
            We will help you sell or buy & bid your dream car here easily and quickly that is reliable.
          </Typography>
          <Button
            variant="contained"
            color="warning"
            className="rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3"
          >
            Learn More
          </Button>
        </Box>

        {/* Hero Image */}
        <Box className="flex justify-center mt-8">
          <img
            src="/path/to/your/hero-image.jpg"
            alt="Hero Car"
            className="rounded-lg shadow-lg max-w-full w-full"
          />
        </Box>
      </Box>

      {/* Car Information Section */}
      <Grid container className="mt-10 mx-0" spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <Typography
              variant="h6"
              className="font-semibold text-white"
            >
              Mercedes Benz G Class 2023
            </Typography>
            <Typography
              className="text-gray-400 text-sm mt-2"
            >
              <span>100,000 km</span> | <span>2023</span> | <span>Manual</span> | <span>Semarang</span>
            </Typography>
            <img
              src="/path/to/your/hero-image.jpg"
              alt="Car Image"
              className="w-full h-48 object-cover rounded-md mt-4"
            />
          </Box>
        </Grid>

        {/* Bidding Section */}
        <Grid item xs={12} md={8}>
          <Box className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <Box className="flex justify-between items-center mb-4">
              <Typography
                variant="h5"
                className="font-semibold text-white"
              >
                Bid Ends In:
              </Typography>
              <Typography
                className="font-semibold text-yellow-400"
              >
                01 Days : 02 Hours : 03 Minutes
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography className="text-gray-400">Starting Bid:</Typography>
                <Typography className="text-white font-semibold">
                  Rp 2.188.400.000
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="text-gray-400">Current Bid:</Typography>
                <Typography className="text-white font-semibold">
                  Rp 2.588.400.000
                </Typography>
              </Grid>
            </Grid>

            <Box className="mt-6 flex gap-4">
              <Button
                variant="outlined"
                color="warning"
                className="border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white flex-1"
              >
                Rp 2.188.400.000
              </Button>
              <Button
                variant="contained"
                color="warning"
                className="bg-orange-500 hover:bg-orange-600 flex-1"
              >
                Post Bid
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeBox;


