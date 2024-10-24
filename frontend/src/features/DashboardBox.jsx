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
    <Box p={3}>
      <Box sx={{ '& > :not(style)': { mb: 3 } }}>
        {/* Overview Stats */}
        <Card>
          <CardHeader 
            title={
              <Typography variant="h6">
                Active Auctions
              </Typography>
            }
          />
          <CardContent>
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom
            >
              {auctions.length}
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              onClick={onCreateAuction}
            >
              Create New Auction
            </Button>
          </CardContent>
        </Card>

        {/* My Auctions Section */}
        <Box>
          <Typography variant="h5" gutterBottom>
            My Auctions
          </Typography>
          <Grid container spacing={3}>
            {auctions.map((auction) => (
              <Grid item xs={12} md={6} lg={4} key={auction.id}>
                <Card>
                  {auction.photoUrl && (
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${auction.photoUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      role="img"
                      aria-label={auction.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {auction.title}
                    </Typography>
                    <Typography 
                      color="textSecondary" 
                      gutterBottom
                    >
                      {auction.description}
                    </Typography>
                    <Box 
                      display="flex" 
                      justifyContent="space-between" 
                      alignItems="center"
                      mb={2}
                    >
                      <Typography variant="h6">
                        ${auction.startingPrice}
                      </Typography>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => onEditAuction(auction.id)}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Box>
                    <Box sx={{ '& > *': { mt: 1 } }}>
                      <Typography variant="body2" color="textSecondary">
                        Starts: {new Date(auction.startTime).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
    </Box>
  );
};

export default DashboardBox;