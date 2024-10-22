import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";

const EditProfileBox = ({ handleSubmit, profileData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    contactNumber: "",
    address: "",
  });
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    setError("");
    };

    const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.contactNumber) {
        setError("Please fill in all required fields");
        return false;
    }
    return true;
    };



    const onSubmit = async (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        setIsSubmitting(true);
        try {
          
          const result = await handleSubmit(formData);

          console.log("from edit profile box");
          console.log('Update successful:', result);
          setError("");
          // You might want to show a success message here
        } catch (err) {
          setError(err.message || "Update failed. Please try again.");
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
         Edit Profile
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar 
          alt={formData.firstName} 
          src="/path/to/profile-pic.jpg"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6">{formData.firstName} {formData.lastName}</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={onSubmit}>
        {/* Form fields remain the same */}
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
          label="Birthday"
          name="DOB"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.DOB}
          onChange={handleChange}
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

        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 3, 
            backgroundColor: "#ff8c00",
            color: "white",
            "&:hover": {
              backgroundColor: "#e07b00"
            }
          }}
        >
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default EditProfileBox;