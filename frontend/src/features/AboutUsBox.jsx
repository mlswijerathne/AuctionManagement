import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Gavel as GavelIcon,
  Groups as GroupsIcon,
  EmojiEvents as AwardIcon,
  Public as PublicIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    { icon: <GavelIcon fontSize="large" />, value: '50k+', label: 'Active Auctions', color: '#1976d2' },
    { icon: <GroupsIcon fontSize="large" />, value: '100k+', label: 'Active Bidders', color: '#2196f3' },
    { icon: <PublicIcon fontSize="large" />, value: '120+', label: 'Countries Served', color: '#64b5f6' },
    { icon: <AwardIcon fontSize="large" />, value: '95%', label: 'Success Rate', color: '#90caf9' }
  ];

  const values = [
    {
      icon: <TimerIcon fontSize="large" />,
      title: 'Real-Time Bidding',
      description: 'Experience seamless, instantaneous bidding with our state-of-the-art auction platform.'
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: 'Secure Transactions',
      description: 'Your security is our priority. Every transaction is protected with advanced encryption.'
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: 'Verified Sellers',
      description: 'We ensure all sellers are verified to maintain the highest standards of trust.'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          borderRadius: 0,
          py: { xs: 8, md: 12 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.75rem' }
              }}
            >
              The Future of Online Auctions
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9
              }}
            >
              We're revolutionizing the way people buy and sell through transparent,
              efficient, and exciting online auctions.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Explore Auctions
            </Button>
          </Box>
        </Container>
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: '#2196f3',
            opacity: 0.1
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: '#64b5f6',
            opacity: 0.1
          }}
        />
      </Paper>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto'
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', maxWidth: '800px', mx: 'auto' }}>
            We're dedicated to creating the most trusted and efficient online auction platform,
            connecting buyers and sellers worldwide through innovative technology and exceptional service.
          </Typography>
        </Box>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#1976d2',
                        width: 56,
                        height: 56,
                        mb: 2
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Paper
          elevation={3}
          sx={{
            bgcolor: '#1976d2',
            color: 'white',
            py: 8,
            px: 4,
            textAlign: 'center',
            borderRadius: 4
          }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Start Bidding?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
            Join thousands of satisfied users who trust our platform for their auction needs.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              borderWidth: 2,
              px: 4,
              '&:hover': {
                borderWidth: 2,
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Join Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;