import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const MyAuctionsBox = ({ auctions }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {auctions.map((auction) => (
          <Grid item xs={12} sm={6} md={4} key={auction.id}>
            <Card>
              {auction.photoUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={auction.photoUrl}
                  alt={auction.title}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {auction.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {auction.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Starting Price: ${auction.startingPrice}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Start Time: {new Date(auction.startTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  End Time: {new Date(auction.endTime).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyAuctionsBox;