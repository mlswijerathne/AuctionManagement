import React from 'react';
import { Box, Typography, Button, Grid } from "@mui/material";

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
            src="About-01.webp"
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
                src="about-02.jpg"
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
            src="about-02.jpg"
            alt="Founders Story"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
          />
        </Box>

        {/* Our Team Section */}
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
            Meet Our Team Member
          </Typography>
          <Grid container spacing={4}>
            {/* Team Member 1 */}
            <Grid item xs={12} md={4}>
              <img
                src="Team-Member01.jpeg"
                alt="K.R.I.Silva"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                K.R.I.Silva
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Computer Science
              </Typography>
              <Typography align="center" variant="body2">
                28356
              </Typography>
              <Typography align="center" variant="body2">
                Front-End Developer
              </Typography>
            </Grid>

            {/* Team Member 2 */}
            <Grid item xs={12} md={4}>
              <img
                src="Team-Member02.jpeg"
                alt="A.S.David"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                KMLS Wijerathne
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Computer Science
              </Typography>
              <Typography align="center" variant="body2">
                28576
              </Typography>
              <Typography align="center" variant="body2">
                Front-End Developer
              </Typography>
              <Typography align="center" variant="body2">
                Back-End Developer
              </Typography>
              <Typography align="center" variant="body2"> (API / Back-End(C#))</Typography>
              
            </Grid>

            {/* Team Member 3 */}
            <Grid item xs={12} md={4}>
              <img
                src="Team-Member03.jpeg"
                alt="L.N.John"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                L.N.John
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Software Engineering
              </Typography>
              <Typography align="center" variant="body2">
                28358
              </Typography>
              <Typography align="center" variant="body2">
                UI/UX Designer
              </Typography>
            </Grid>

            {/* Team Member 4 */}
            <Grid item xs={12} md={4}>
              <img
                src="Team-Member04.jpeg"
                alt="M.A.Raj"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                M.A.Raj
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Data Science
              </Typography>
              <Typography align="center" variant="body2">
                28359
              </Typography>
              <Typography align="center" variant="body2">
                Data Analyst
              </Typography>
            </Grid>
             {/* Team Member 5 */}
             <Grid item xs={12} md={4}>
              <img
                src="Team-Member04.jpeg"
                alt="M.A.Raj"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                M.A.Raj
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Data Science
              </Typography>
              <Typography align="center" variant="body2">
                28359
              </Typography>
              <Typography align="center" variant="body2">
                Data Analyst
              </Typography>
            </Grid>

            {/* Team Member 6 */}
            <Grid item xs={12} md={4}>
              <img
                src="Team-Member05.jpeg"
                alt="S.P.Rani"
                style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
              />
              <Typography align="center" variant="subtitle1" fontWeight="bold">
                S.P.Rani
              </Typography>
              <Typography align="center" variant="body2">
                BSc(Honours) in Business Administration
              </Typography>
              <Typography align="center" variant="body2">
                28360
              </Typography>
              <Typography align="center" variant="body2">
                Marketing Specialist
              </Typography>
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

