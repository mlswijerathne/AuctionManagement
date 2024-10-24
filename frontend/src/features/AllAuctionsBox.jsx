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
  Skeleton 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllAuctionsBox = ({ auctions, error, loading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const backgroundColor = theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.grey[100];

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          backgroundColor: backgroundColor,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4
          }}
        >
          <Typography component="h1" variant="h4">
            Available Auctions
          </Typography>
          <Button
            variant="contained"
            sx={{ 
              backgroundColor: 'orange', 
              color: 'white', 
              '&:hover': { 
                backgroundColor: '#ff8c00' 
              } 
            }}
            onClick={() => navigate('/addauction')}
          >
            Add New Auction
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            auctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} key={auction.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height={200}
                    image={auction.photoUrl || "/auction-placeholder.png"}
                    alt={auction.title}
                    sx={{ 
                      objectFit: 'cover',
                      backgroundColor: 'grey.200'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {auction.title}
                    </Typography>
                    <Typography>
                      Starting Price: ${auction.startingPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ends: {new Date(auction.endTime).toLocaleDateString()}
                    </Typography>
                    {auction.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mt: 1,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {auction.description}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/auctiondetails/${auction.id}`)}
                      sx={{ color: 'orange' }}
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