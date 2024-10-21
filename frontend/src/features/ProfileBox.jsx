// features/Profile.jsx
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useState } from "react";

const ProfileBox = () => {
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
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
    // Implement your save logic here
    console.log("Profile updated:", formData);
  };

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
          alt={formData.username} 
          src="/path/to/profile-pic.jpg" // Replace with your image path
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6">{formData.username}</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Username"
          name="username"
          fullWidth
          value={formData.username}
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
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfileBox;
