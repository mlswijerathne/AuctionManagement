import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import PropTypes from 'prop-types';

const AddAuctionBox = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startingPrice: "",
        startingTime: "",
        endTime: "",
        auctionPicturePath: null
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "auctionPicturePath") {
            // Handle file input
            if (files && files[0]) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validTypes.includes(files[0].type)) {
                    setError("Please upload a valid image file (JPEG, PNG, or GIF)");
                    return;
                }
                // Validate file size (e.g., max 5MB)
                if (files[0].size > 5 * 1024 * 1024) {
                    setError("File size should not exceed 5MB");
                    return;
                }
            }
            setFormData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
        } else if (name === "startingPrice") {
            // Ensure positive numbers only for price
            const numValue = parseFloat(value);
            if (numValue < 0) {
                setError("Starting price cannot be negative");
                return;
            }
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
        setError("");
    };

    const validateForm = () => {
        // Validate required fields
        if (!formData.title) {
            setError("Title is required");
            return false;
        }
        if (!formData.description) {
            setError("Description is required");
            return false;
        }
        if (!formData.startingPrice) {
            setError("Starting price is required");
            return false;
        }
        if (!formData.startingTime) {
            setError("Starting time is required");
            return false;
        }
        if (!formData.endTime) {
            setError("End time is required");
            return false;
        }
        if (!formData.auctionPicturePath) {
            setError("Auction picture is required");
            return false;
        }

        // Validate dates
        const startTime = new Date(formData.startingTime);
        const endTime = new Date(formData.endTime);
        const now = new Date();

        if (startTime < now) {
            setError("Start time must be in the future");
            return false;
        }
        if (endTime <= startTime) {
            setError("End time must be after start time");
            return false;
        }

        // Validate price format
        if (isNaN(parseFloat(formData.startingPrice)) || parseFloat(formData.startingPrice) <= 0) {
            setError("Please enter a valid positive number for starting price");
            return false;
        }

        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started');

        if (!validateForm()) {
            return;
        }

        if (typeof onSubmit !== 'function') {
            console.error('onSubmit prop is not a function');
            setError("Internal error: Form submission handler not properly configured");
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("title", formData.title.trim());
            formDataToSubmit.append("description", formData.description.trim());
            formDataToSubmit.append("startingPrice", formData.startingPrice);
            formDataToSubmit.append("startingTime", formData.startingTime);
            formDataToSubmit.append("endTime", formData.endTime);
            formDataToSubmit.append("auctionPicturePath", formData.auctionPicturePath);

            console.log('Submitting form data...');
            await onSubmit(formDataToSubmit);
            console.log('Form submitted successfully');

            // Reset form
            setFormData({
                title: "",
                description: "",
                startingPrice: "",
                startingTime: "",
                endTime: "",
                auctionPicturePath: null
            });
            
            // Clear any error messages
            setError("");
        } catch (err) {
            console.error('Form submission error:', err);
            setError(err.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                mt: 2,
                p: 3,
                borderRadius: 2,
                backgroundColor: "#f3f4f6",
                boxShadow: 3,
                maxWidth: 500,
                mx: "auto",
            }}
        >
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontWeight: "bold",
                    color: "black",
                    mb: 2,
                    "& span": { color: "orange" },
                }}
            >
                Add <span>Auction</span> Item
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
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
                inputProps={{ maxLength: 100 }}
                helperText={`${formData.title.length}/100 characters`}
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
                inputProps={{ maxLength: 1000 }}
                helperText={`${formData.description.length}/1000 characters`}
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
                inputProps={{ min: 0, step: "0.01" }}
            />

            <TextField
                margin="normal"
                label="Starting Time"
                name="startingTime"
                type="datetime-local"
                fullWidth
                value={formData.startingTime}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                sx={{ backgroundColor: "white" }}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                margin="normal"
                label="End Time"
                name="endTime"
                type="datetime-local"
                fullWidth
                value={formData.endTime}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                sx={{ backgroundColor: "white" }}
                InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ mt: 2, mb: 2 }}>
                <input
                    accept="image/*"
                    type="file"
                    name="auctionPicturePath"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    style={{ 
                        backgroundColor: "white", 
                        width: "100%", 
                        padding: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                    required
                />
                <Typography variant="caption" color="textSecondary">
                    Supported formats: JPEG, PNG, GIF. Max size: 5MB
                </Typography>
            </Box>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    backgroundColor: "orange",
                    color: "black",
                    "&:hover": { backgroundColor: "darkorange" },
                    "&:disabled": { backgroundColor: "#ffd699" }
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Add Auction Item"}
            </Button>
        </Box>
    );
};

AddAuctionBox.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddAuctionBox;