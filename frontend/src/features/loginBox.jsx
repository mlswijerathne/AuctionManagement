// loginBox.jsx
import { useTheme } from "@emotion/react";
import { Box, Button, Container, TextField, Typography, Alert, Grid } from "@mui/material";
import { useState } from "react";

const LoginBox = ({ handleSubmit, handleLogout, error }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    return formData.email && formData.password;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await handleSubmit(e, formData.email, formData.password);
        setFormData({ email: "", password: "" });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const theme = useTheme();
  const backgroundColor = theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.grey[100];

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          backgroundColor: backgroundColor,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          {handleLogout ? (
            // Display the logout button if logged in
            <Grid item xs={12}>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Grid>
          ) : (
            // Display the login form if not logged in
            <>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="Login.png"
                  alt="Login Illustration"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: '100%',
                  }}
                >
                  <Typography component="h1" variant="h4">
                    Auction Login Page
                  </Typography>
                  {error && (
                    <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                      margin="normal"
                      id="email"
                      name="email"
                      autoComplete="email"
                      label="Email"
                      type="email"
                      autoFocus
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: 'orange', color: 'white', '&:hover': { backgroundColor: '#ff8c00' } }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginBox;