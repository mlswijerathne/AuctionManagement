// src/pages/SetImagePage.jsx

import React from "react";
import SetImageBox from "../features/SetImageBox";
import AccountService from "../services/accountService"; // Import AccountService

const SetImagePage = () => {
  const handleImageUpload = async (formData) => {
    try {
      const response = await AccountService.updateProfilePicture(formData);
      if ("error" in response) {
        console.error("Image upload failed:", response.error);
      } else {
        console.log("Image uploaded successfully:", response);
        // Optionally redirect or show a success message here
      }
    } catch (err) {
      console.error("Error during image upload:", err);
    }
  };

  const handleImageDelete = async () => {
    try {
      const response = await AccountService.deleteProfilePicture();
      if ("error" in response) {
        console.error("Image deletion failed:", response.error);
        return response; // Return response to handle errors
      } else {
        console.log("Image deleted successfully:", response);
        // Optionally show a success message here
      }
    } catch (err) {
      console.error("Error during image deletion:", err);
      return { error: err.message }; // Return error
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


