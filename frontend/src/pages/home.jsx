import React from 'react';
import { Box } from '@mui/material';
import HomeBox from '../features/HomeBox'; // Adjust the import path based on your folder structure
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: 2 }}>
      <HomeBox />
      {/* You can add more components here for additional sections on the home page */}
    </Box>
  );
};

export default Home;
