import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const AuctionDetailsBox = ({ auctionData, photoUrl }) => {
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const isAuctionActive = () => {
    if (!auctionData) return false;
    const now = new Date();
    const startTime = new Date(auctionData.startTime);
    const endTime = new Date(auctionData.endTime);
    return now >= startTime && now <= endTime;
  };

  const AuctionField = ({ icon, label, value }) => (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">
          {value || "Not provided"}
        </Typography>
      </Box>
    </Box>
  );

  if (!auctionData) {
    return (
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Alert severity="info">Auction not found</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f3f4f6",
        boxShadow: 3,
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{
          color: 'black', // Change title color to black
          fontWeight: 'bold', // Make the title bold
          '& span': {
            color: 'orange', // Add color to a specific part of the title if needed
          }
        }}
      >
        Car Auction <span>Details</span> {/* You can use <span> to color part of the title */}
      </Typography>
  
      {photoUrl && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <img
            src={photoUrl}
            alt={auctionData.title}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>
      )}
  
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {auctionData.description}
        </Typography>
      </Box>
  
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <AuctionField
            icon={<MonetizationOnIcon sx={{ color: 'orange' }} />} // Change icon color to orange
            label="Starting Price"
            value={`$${parseFloat(auctionData.startingPrice).toFixed(2)}`}
          />
  
          <AuctionField
            icon={<AccessTimeIcon sx={{ color: 'orange' }} />} // Change icon color to orange
            label="Start Time"
            value={formatDateTime(auctionData.startTime)}
          />
  
          <AuctionField
            icon={<AccessTimeIcon sx={{ color: 'orange' }} />} // Change icon color to orange
            label="End Time"
            value={formatDateTime(auctionData.endTime)}
          />
        </Box>
  
        <Box sx={{ 
          flex: 1, 
          minWidth: '250px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end' 
        }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 2,
                backgroundColor: isAuctionActive() ? '#e8f5e9' : '#f5f5f5',
                color: isAuctionActive() ? '#2e7d32' : '#757575',
              }}
            >
              {isAuctionActive() ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
  
          {isAuctionActive() && (
            <Button
              variant="contained"
              sx={{ 
                mt: 2,
                backgroundColor: "#ff8c00", // Orange button color
                color: "white",
                "&:hover": {
                  backgroundColor: "#e07b00"
                }
              }}
            >
              Place Bid
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
  
};

export default AuctionDetailsBox;