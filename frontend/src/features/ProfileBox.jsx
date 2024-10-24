import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
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
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Avatar 
            alt={formData.firstName} 
            src={profilePicture || "/path/to/default-profile-pic.jpg"}
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              border: '2px solid #ff8c00'
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            
          </Box>
        </Box>
        <Typography variant="h6">{formData.firstName} {formData.lastName}</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProfileField label="UserName" value={formData.userName} />
        <ProfileField label="Email" value={formData.email} />
        <ProfileField label="First Name" value={formData.firstName} />
        <ProfileField label="Last Name" value={formData.lastName} />
        <ProfileField label="Birthday" value={formData.DOB} />
        <ProfileField label="Contact Number" value={formData.contactNumber} />
        <ProfileField label="Address" value={formData.address} />

        <Button
          onClick={() => navigate("/editprofile")}
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
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileBox;