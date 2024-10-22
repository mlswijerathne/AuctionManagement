import { Box, Typography, TextField, Button, Alert, Grid } from "@mui/material";
import { useState } from "react";

const ContactUsBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message } = formData;
    if (!firstName || !lastName || !email || !phone || !message) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Implement your form submission logic here (e.g., send to an API)
      // For demonstration, we'll just show a success message
      setSuccess("Your message has been sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" }); // Reset form
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens
        maxWidth: 900,
        margin: "auto",
        mt: 4,
        borderRadius: 2,
        backgroundColor: "#f3f4f6", // Light background color
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <img
          src="Contact Us.jpg" // Replace with your image path
          alt="Contact Us Illustration"
          style={{ width: '100%', borderRadius: '8px', maxWidth: '400px' }} // Adjust size as necessary
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                label="First Name"
                name="firstName"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                label="Last Name"
                name="lastName"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Leave us a few words"
                name="message"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#ff8c00", "&:hover": { backgroundColor: "#e07b00" } }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactUsBox;
