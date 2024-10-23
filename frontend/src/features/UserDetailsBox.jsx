// UserDetails.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const UserDetailsBox = ({ profileData }) => {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Details
      </Typography>
      <Typography variant="h6">First Name: {profileData.firstName}</Typography>
      <Typography variant="h6">Last Name: {profileData.lastName}</Typography>
      <Typography variant="h6">Birthday: {profileData.DOB}</Typography>
      <Typography variant="h6">Contact Number: {profileData.contactNumber}</Typography>
      <Typography variant="h6">Address: {profileData.address}</Typography>
    </Box>
  );
};

export default UserDetailsBox;
