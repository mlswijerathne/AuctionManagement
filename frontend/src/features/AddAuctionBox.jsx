import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const AddAuctionBox = ({ onSubmit }) => {  // Add onSubmit prop here
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
            setFormData(prevData => ({
                ...prevData,
                [name]: files[0]
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
        if (!formData.title || 
            !formData.description || 
            !formData.startingPrice || 
            !formData.startingTime || 
            !formData.endTime || 
            !formData.auctionPicturePath) {
            setError("Please fill in all fields");
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

        setIsSubmitting(true);
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("title", formData.title);
            formDataToSubmit.append("description", formData.description);
            formDataToSubmit.append("startingPrice", formData.startingPrice);
            formDataToSubmit.append("startingTime", formData.startingTime);
            formDataToSubmit.append("endTime", formData.endTime);
            formDataToSubmit.append("auctionPicturePath", formData.auctionPicturePath);

            console.log('Submitting form data...');
            // Call the parent component's onSubmit function
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
            <input
                accept="image/*"
                type="file"
                name="auctionPicturePath"
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ backgroundColor: "white", width: "100%", padding: "16px", marginTop: "16px" }}
                required
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    backgroundColor: "orange",
                    color: "black",
                    "&:hover": { backgroundColor: "darkorange" },
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Add Auction Item"}
            </Button>
        </Box>
    );
};

export default AddAuctionBox;