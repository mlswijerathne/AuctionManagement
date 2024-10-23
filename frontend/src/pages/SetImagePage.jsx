// src/pages/SetImagePage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import SetImageBox from "../features/SetImageBox";
import AccountService from "../services/accountService";

const SetImagePage = () => {
  const navigate = useNavigate(); // Add navigation hook

  const handleImageUpload = async (formData) => {
    try {
      const response = await AccountService.updateProfilePicture(formData);
      if ("error" in response) {
        console.error("Image upload failed:", response.error);
      } else {
        console.log("Image uploaded successfully:", response);
        navigate("/EditProfile"); // Redirect back to the Edit Profile page after successful upload
      }
    } catch (err) {
      console.error("Error during image upload:", err);
    }
    navigate('/EditProfile');
  };

  const handleImageDelete = async () => {
    const response = await AccountService.deleteProfilePicture();
    if (response && "error" in response) {
      console.error("Failed to delete profile picture:", response.error);
    } else {
      console.log("Image deleted successfully:", response);
      navigate("/set-image"); // Redirect back to the Edit Profile page after deletion
    }
  };

  return (
    <SetImageBox 
      handleImageUpload={handleImageUpload} 
      handleImageDelete={handleImageDelete} 
    />
  );
};

export default SetImagePage;



