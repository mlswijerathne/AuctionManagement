import { Box, Typography, TextField, Button, Avatar, MenuItem } from "@mui/material";
import { useState } from "react";

const ProfileBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    status: "",
    email: "johndoe@example.com",
    address: "",
    contactNumber: "",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
  };

  const countries = ["Sri Lanka", "United States", "Canada", "India", "Germany", "Australia"];
  const statusOptions = ["Married", "Single"];

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f3f4f6",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar 
          alt={formData.firstName} 
          src="/path/to/profile-pic.jpg" // Replace with your image path
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6">{formData.firstName} {formData.lastName}</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="First Name"
          name="firstName"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          label="Last Name"
          name="lastName"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          label="Contact Number"
          name="contactNumber"
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Birthday"
          name="birthday"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.birthday}
          onChange={handleChange}
        />
        <TextField
          select
          margin="normal"
          label="Country"
          name="country"
          fullWidth
          value={formData.country}
          onChange={handleChange}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          margin="normal"
          label="Status"
          name="status"
          fullWidth
          value={formData.status}
          onChange={handleChange}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          label="Bio"
          name="bio"
          fullWidth
          multiline
          rows={4}
          value={formData.bio}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 3, 
            backgroundColor: "#ff8c00", // Orange color
            color: "white",
            "&:hover": {
              backgroundColor: "#e07b00" // Darker orange on hover
            }
          }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfileBox;

