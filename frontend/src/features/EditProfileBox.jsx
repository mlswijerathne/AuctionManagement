import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditProfileBox = ({ handleSubmit, profileData }) => {
  const [formData, setFormData] = useState({
    firstName: profileData.firstName || "",
    lastName: profileData.lastName || "",
    DOB: profileData.DOB || "",
    contactNumber: profileData.contactNumber || "",
    address: profileData.address || "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Use navigate hook

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
        console.log("Update successful:", result);
        setError("");
        navigate("/user-details"); // Navigate to the user details page after successful update
      } catch (err) {
        setError(err.message || "Update failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100];

  // Function to handle navigation when Avatar is clicked
  const goToSetImagePage = () => {
    navigate("/set-image"); // Navigate to the set-image page
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
        Edit User Profile
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}
      >
        {/* Wrap Avatar in a Box and add onClick */}
        <Box onClick={goToSetImagePage} sx={{ cursor: "pointer" }}>
          <Avatar
            alt={formData.firstName}
            src="/path/to/profile-pic.jpg"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        </Box>
        <Typography variant="h6">
          {formData.firstName} {formData.lastName}
        </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={onSubmit}>
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
              backgroundColor: "#e07b00",
            },
          }}
        >
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default EditProfileBox;




// import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
// import { useState } from "react";
// import { useTheme } from "@emotion/react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const EditProfileBox = ({ handleSubmit, profileData }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     DOB: "",
//     contactNumber: "",
//     address: "",
//   });

//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate(); // Use navigate hook

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setError("");
//   };

//   const validateForm = () => {
//     if (!formData.firstName || !formData.lastName || !formData.contactNumber) {
//       setError("Please fill in all required fields");
//       return false;
//     }
//     return true;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setIsSubmitting(true);
//       try {
//         const result = await handleSubmit(formData);
//         console.log("from edit profile box");
//         console.log("Update successful:", result);
//         setError("");
//       } catch (err) {
//         setError(err.message || "Update failed. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const theme = useTheme();
//   const backgroundColor =
//     theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100];

//   // Function to handle navigation when Avatar is clicked
//   const goToSetImagePage = () => {
//     navigate("/set-image"); // Navigate to the set-image page
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         mt: 4,
//         p: 3,
//         borderRadius: 2,
//         backgroundColor: "#f3f4f6",
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom>
//         Edit User Profile
//       </Typography>

//       <Box
//         sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}
//       >
//         {/* Wrap Avatar in a Box and add onClick */}
//         <Box onClick={goToSetImagePage} sx={{ cursor: "pointer" }}>
//           <Avatar
//             alt={formData.firstName}
//             src="/path/to/profile-pic.jpg"
//             sx={{ width: 100, height: 100, mb: 2 }}
//           />
//         </Box>
//         <Typography variant="h6">
//           {formData.firstName} {formData.lastName}
//         </Typography>
//       </Box>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       <form onSubmit={onSubmit}>
//         <TextField
//           margin="normal"
//           label="First Name"
//           name="firstName"
//           fullWidth
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Last Name"
//           name="lastName"
//           fullWidth
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Birthday"
//           name="DOB"
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={formData.DOB}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           label="Contact Number"
//           name="contactNumber"
//           fullWidth
//           value={formData.contactNumber}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Address"
//           name="address"
//           fullWidth
//           value={formData.address}
//           onChange={handleChange}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           sx={{
//             mt: 3,
//             backgroundColor: "#ff8c00",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#e07b00",
//             },
//           }}
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default EditProfileBox;



















// import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
// import { useState } from "react";
// import { useTheme } from "@emotion/react";

// const EditProfileBox = ({ handleSubmit, profileData }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     DOB: "",
//     contactNumber: "",
//     address: "",
//     profileImage: "", // Add new field for the image
//   });
  
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewImage, setPreviewImage] = useState(""); // For image preview

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setError("");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setFormData((prevData) => ({
//         ...prevData,
//         profileImage: file,
//       }));
//     }
//   };

//   const validateForm = () => {
//     if (!formData.firstName || !formData.lastName || !formData.contactNumber) {
//       setError("Please fill in all required fields");
//       return false;
//     }
//     return true;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsSubmitting(true);
//       try {
//         const result = await handleSubmit(formData);
//         console.log("Update successful:", result);
//         setError("");
//       } catch (err) {
//         setError(err.message || "Update failed. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const theme = useTheme();
//   const backgroundColor =
//     theme.palette.mode === "dark"
//       ? theme.palette.grey[900]
//       : theme.palette.grey[100];

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         mt: 4,
//         p: 3,
//         borderRadius: 2,
//         backgroundColor: "#f3f4f6",
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom>
//         Edit Profile
//       </Typography>

//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
//         <Avatar
//           alt={formData.firstName}
//           src={previewImage || "/path/to/default-profile-pic.jpg"} // Display selected image
//           sx={{ width: 100, height: 100, mb: 2 }}
//         />
//         <input
//           accept="image/*"
//           type="file"
//           onChange={handleImageChange}
//           style={{ display: "block", marginBottom: "20px" }}
//         />
//         <Typography variant="h6">
//           {formData.firstName} {formData.lastName}
//         </Typography>
//       </Box>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       <form onSubmit={onSubmit}>
//         <TextField
//           margin="normal"
//           label="First Name"
//           name="firstName"
//           fullWidth
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Last Name"
//           name="lastName"
//           fullWidth
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Birthday"
//           name="DOB"
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={formData.DOB}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           label="Contact Number"
//           name="contactNumber"
//           fullWidth
//           value={formData.contactNumber}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           margin="normal"
//           label="Address"
//           name="address"
//           fullWidth
//           value={formData.address}
//           onChange={handleChange}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           sx={{
//             mt: 3,
//             backgroundColor: "#ff8c00",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#e07b00",
//             },
//           }}
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default EditProfileBox;





