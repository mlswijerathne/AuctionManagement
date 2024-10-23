// src/features/SetImageBox.jsx

import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import AccountService from "../services/accountService"; // Import the AccountService

const SetImageBox = ({ handleImageUpload, handleImageDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  

  // Fetch the existing profile picture when the component mounts
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const imageUrl = await AccountService.getProfilePicture();
      if (imageUrl && !imageUrl.error) {
        setSelectedImage(imageUrl);
      } else {
        setError(imageUrl.error || "Failed to fetch profile picture.");
      }
    };

    fetchProfilePicture();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the selected file is an image
      const isValidImage = file.type.startsWith("image/");
      if (isValidImage) {
        setSelectedImage(URL.createObjectURL(file)); // Preview image
        setError(""); // Clear any previous error
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profilePicture", selectedImage); // Append the image file
      await handleImageUpload(formData); // Pass formData to the parent component for uploading
    } else {
      setError("Please select an image to upload.");
    }
  };

  const handleDelete = async () => {
    const response = await handleImageDelete(); // Call delete function
    if (response && "error" in response) {
      setError("Failed to delete profile picture."); // Handle error
    } else {
      setSelectedImage(null); // Clear selected image on successful deletion
    }
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
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Set User Profile Image
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Preview Selected Image */}
      {selectedImage && (
        <Avatar
          alt="Selected Image"
          src={selectedImage}
          sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "16px" }}
      />

      <Box>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            backgroundColor: "#ff8c00",
            color: "white",
            margin: "8px", // Consistent margin for buttons
            "&:hover": {
              backgroundColor: "#e07b00",
            },
          }}
        >
          Upload Image
        </Button>

        <Button
          variant="outlined"
          onClick={handleDelete}
          sx={{
            mt: 2,
            color: "red",
            borderColor: "red",
            margin: "8px", // Consistent margin for buttons
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          Delete Image
        </Button>
      </Box>
    </Box>
  );
};

export default SetImageBox;
