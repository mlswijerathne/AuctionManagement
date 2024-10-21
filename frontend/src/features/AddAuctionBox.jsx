import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const AddAuctionBox = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    startingTime: "",
    endTime: "",
    imgUrl: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.startingPrice ||
      !formData.startingTime ||
      !formData.endTime ||
      !formData.imgUrl
    ) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await handleSubmit(e, formData);
        setFormData({
          title: "",
          description: "",
          startingPrice: "",
          startingTime: "",
          endTime: "",
          imgUrl: ""
        });
      } catch (err) {
        setError(err.message || "Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f3f4f6", // Light background color
        boxShadow: 3,
        maxWidth: 500,
        mx: "auto", // Center the form horizontally
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "black",
          mb: 2,
          "& span": { color: "orange" }, // Style for the orange part of the title
        }}
      >
        Add <span>Auction</span> Item
      </Typography>
      {error && (
        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        margin="normal"
        label="Title"
        name="title"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        margin="normal"
        label="Description"
        name="description"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        margin="normal"
        label="Starting Price"
        name="startingPrice"
        type="number"
        fullWidth
        value={formData.startingPrice}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        margin="normal"
        label=""
        name="startingTime"
        type="datetime-local"
        fullWidth
        value={formData.startingTime}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        margin="normal"
        label=""
        name="endTime"
        type="datetime-local"
        fullWidth
        value={formData.endTime}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        margin="normal"
        label="Image URL"
        name="imgUrl"
        fullWidth
        value={formData.imgUrl}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        sx={{ backgroundColor: "white" }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "orange",
          color: "black",
          "&:hover": { backgroundColor: "orange-800" }, // Slightly darker shade on hover
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Auction Item"}
      </Button>
    </Box>
  );
};

export default AddAuctionBox;
