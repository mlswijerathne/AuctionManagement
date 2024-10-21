import { useTheme } from "@emotion/react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { Password } from "@mui/icons-material";

const LoginBox = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await handleSubmit(e, formData.email, formData.password);
        // Clear form after successful submission
        setFormData({ email: "", password: "" });
      } catch (err) {
        setError(err.message || "Login failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      e.preventDefault();
    }
  };


  // const [logUser,setLogUser]  = useState({
  //   email:"",
  //   Password:""
  // });

  // const handleChange = (e)=>{
  //   setLogUser({
  //     ...logUser,
  //     [e.target.name]:e.target.value
  //   })
  // }

  // const onSubmit = async(e)=>{
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5189/api/v1/accounts/login",logUser);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  const theme = useTheme();
  const backgroundColor = theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.grey[100];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            id="email"
            name="email"
            autoComplete="email"
            label="Email"
            type="email"
            autoFocus
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginBox;