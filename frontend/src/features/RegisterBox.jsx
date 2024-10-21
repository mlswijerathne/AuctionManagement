import { useTheme } from "@emotion/react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const RegisterBox = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    ContactNumber: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Add more validation as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    if (validateForm()) {
      handleSubmit(e, formData);
    } else {
      e.preventDefault();
    }
  };

  const theme = useTheme();
  const backgroundColor = theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.grey[100];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            id="username"
            name="username"
            autoComplete="username"
            label="Username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="email"
            name="email"
            autoComplete="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            label="First Name"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="password"
            name="password"
            autoComplete="new-password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            label="Confirm Password"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            margin="normal"
            id="DOB"
            name="DOB"
            autoComplete="bday"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.DOB}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            id="ContactNumber"
            name="ContactNumber"
            autoComplete="tel"
            label="Contact Number"
            fullWidth
            value={formData.ContactNumber}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            id="address"
            name="address"
            autoComplete="street-address"
            label="Address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterBox;