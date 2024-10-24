import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit } from 'lucide-react';

const DashboardBox = ({ 
  auctions, 
  loading, 
  error, 
  onEditAuction, 
  onCreateAuction 
}) => {
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

  return (
    <Box p={3} sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      {/* Overview Stats */}
      <Card sx={{ borderRadius: '8px', mb: 3, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader 
          title={<Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>Active Auctions</Typography>}
        />
        <CardContent>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ color: 'black', fontWeight: 'bold' }}
          >
            {auctions.length}
          </Typography>
          <Button 
            variant="contained" 
            fullWidth
            sx={{ 
              backgroundColor: '#ff8c00', // Orange button color
              color: 'white',
              '&:hover': {
                backgroundColor: '#e07b00',
              },
              borderRadius: '5px',
            }}
            onClick={onCreateAuction}
          >
            Create New Auction
          </Button>
        </CardContent>
      </Card>

      {/* My Auctions Section */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ color: 'orange', fontWeight: 'bold', textAlign: 'center' }}>
          My Auctions
        </Typography>
        <Grid container spacing={3}>
          {auctions.map((auction) => (
            <Grid item xs={12} md={6} lg={4} key={auction.id}>
              <Card sx={{ borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                {auction.photoUrl && (
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${auction.photoUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                    role="img"
                    aria-label={auction.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                    {auction.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {auction.description}
                  </Typography>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                      ${auction.startingPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#ff8c00', // Orange button color
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#e07b00',
                        },
                        borderRadius: '5px',
                      }}
                      onClick={() => onEditAuction(auction.id)}
                      startIcon={<Edit sx={{ color: 'white' }} />} // White icon
                    >
                      Edit
                    </Button>
                  </Box>
                  <Box sx={{ '& > *': { mt: 1 } }}>
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                      Starts: {new Date(auction.startTime).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                      Ends: {new Date(auction.endTime).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardBox;