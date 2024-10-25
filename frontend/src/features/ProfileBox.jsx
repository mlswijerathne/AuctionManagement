import { Box, Typography, TextField, Button, Avatar,Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({ 
  handleSubmit, 
  profileData, 
  profilePicture, 
  onUpdateProfilePicture, 
  onDeleteProfilePicture 
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    DOB: "",
    contactNumber: "",
    address: "",
  });
  
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData) {
      const formattedDOB = profileData.DOB ? new Date(profileData.DOB).toISOString().split('T')[0] : "";
      setFormData({
        userName: profileData.userName || "",
        email: profileData.email || "",
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        DOB: formattedDOB,
        contactNumber: profileData.contactNumber || "",
        address: profileData.address || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await onUpdateProfilePicture(file);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await handleSubmit(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await onDeleteProfilePicture();
    } catch (err) {
      setError(err.message);
    }
  };

  const ProfileField = ({ label, value }) => (
    <Box sx={{ mb: 2, textAlign: 'center' }}>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
      <Typography variant="body1">{value || "Not provided"}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: 3,
      }}
    >
      {/* My Profile Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4,
          color: 'black', // Orange color for header
        }}
      >
        My Profile
      </Typography>

      {/* Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          alt={`${formData.firstName} ${formData.lastName}`}
          src={profilePicture || "/path/to/default-profile-pic.jpg"}
          sx={{
            width: 100,
            height: 100,
            mr: 3,
            border: '4px solid #ff8c00',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
            {formData.firstName} {formData.lastName}
          </Typography>
          <Typography variant="body1" sx={{ color: '#777' }}>
            {formData.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            {formData.email}
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ mb: 3 }} />

      {/* Profile Information - Same Line Format */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', width: '150px' }}>First Name:</Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>{formData.firstName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', width: '150px' }}>Last Name:</Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>{formData.lastName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', width: '150px' }}>Birthday:</Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>{formData.DOB}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', width: '150px' }}>Contact Number:</Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>{formData.contactNumber}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555', width: '150px' }}>Address:</Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>{formData.address}</Typography>
        </Box>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {/* Edit Profile Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          onClick={() => navigate("/editprofile")}
          variant="contained"
          sx={{
            backgroundColor: "#ff8c00",
            color: "white",
            "&:hover": {
              backgroundColor: "#e07b00",
            },
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileBox;