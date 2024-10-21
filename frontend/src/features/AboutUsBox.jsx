// features/AboutUsBox.jsx
import { Box, Typography, Button } from "@mui/material";

const AboutUsBox = () => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f3f4f6", // Light background color
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h6" gutterBottom>
        Our Mission
      </Typography>
      <Typography paragraph>
        At [Your Auction House Name], our mission is to provide a seamless and transparent auction experience for buyers and sellers alike. We are dedicated to connecting collectors with valuable items through our innovative platform.
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Our History
      </Typography>
      <Typography paragraph>
        Established in [Year], [Your Auction House Name] has grown to become a trusted name in the auction industry. Our team of experts is passionate about helping our clients achieve the best possible outcomes for their auctions.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Meet Our Team
      </Typography>
      <Typography paragraph>
        Our team consists of experienced auctioneers, appraisers, and customer service representatives who are committed to providing exceptional service. Together, we strive to make every auction a success.
      </Typography>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" href="/contact-us">
          Get in Touch
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsBox;
