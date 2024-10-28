import React from 'react';
import { Box, Typography, Button, Grid, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import aboutbg1 from '../assets/aboutUs1.jpg';
import aboutbg2 from '../assets/aboutUs2.jpg';
import aboutbg3 from '../assets/aboutUs3.jpg';

const AboutUsBox = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f3f4f6", // Light background color for the entire page
          py: 6,
        }}
      >
        {/* About Us Section */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            mb: 6,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography paragraph>
            HubSpot's company and culture are a lot like our product. They're crafted, not cobbled, for a delightful experience.
          </Typography>
          <img
            src={aboutbg1}
            alt="Company Team"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
          />
        </Box>

        {/* Our Mission Section */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            mb: 6,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Our Mission: Helping Millions of Organizations Grow Better
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={aboutbg2}
                alt="Office Environment"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography paragraph>
                We believe not just in growing bigger, but in growing better. And growing better means aligning the success of your own business
                with the success of your customers. Win-win!
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Our Story Section */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            mb: 6,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Typography paragraph>
            In 2004, fellow MIT graduate students Brian Halligan and Dharmesh Shah noticed a major shift in the way people shop and purchase products.
            Buyers didn't want to be interrupted by ads; they wanted helpful information. In 2006, they founded HubSpot to help companies use that shift to grow better with inbound marketing.
          </Typography>
          <img
            src={aboutbg3}
            alt="Founders Story"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
          />
        </Box>

        {/* Settings & Helps */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            mb: 6,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Settings & Helps
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Settings</Typography>
              <List>
                <ListItem component={Link} to="/account-settings">
                  <ListItemText primary="Account Settings" />
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/privacy-settings">
                  <ListItemText primary="Privacy Settings" />
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/notification-preferences">
                  <ListItemText primary="Notification Preferences" />
                </ListItem>
                <Divider />
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Help & Support</Typography>
              <List>
                <ListItem component={Link} to="/faqs">
                  <ListItemText primary="FAQs" />
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/contact-support">
                  <ListItemText primary="Contact Support" />
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/user-guide">
                  <ListItemText primary="User Guide" />
                </ListItem>
                <Divider />
              </List>
            </Grid>
          </Grid>
        </Box>

        {/* By the Numbers Section */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            mb: 6,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" gutterBottom>
            HubSpot By the Numbers
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">12 Global Offices</Typography>
              <Button variant="text" href="/" color="primary">
                Learn more
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">7,600+ Employees</Typography>
              <Button variant="text" href="/" color="primary">
                Learn more
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">205,000+ Customers</Typography>
              <Button variant="text" href="/" color="primary">
                Learn more
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Awards Section */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="body1" gutterBottom>
            Voted #1 in 318 categories
          </Typography>
          <Button variant="text" href="/" color="primary">
            Learn more
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsBox;

