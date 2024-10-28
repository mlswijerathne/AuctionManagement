import { useNavigate } from "react-router-dom";
import RegisterAccountDto from "../dto/auth/registerAccountDto";
import AuthViewModel from "../viewModels/AuthViewModel";
import RegisterBox from "../features/RegisterBox";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    
    try {
      const registerAccountDto = new RegisterAccountDto();
      registerAccountDto.username = formData.username;
      registerAccountDto.email = formData.email;
      registerAccountDto.firstName = formData.firstName;
      registerAccountDto.lastName = formData.lastName;
      registerAccountDto.password = formData.password;
      registerAccountDto.DOB = new Date(formData.DOB);
      registerAccountDto.ContactNumber = formData.ContactNumber;
      registerAccountDto.address = formData.address;
      
      const response = await AuthViewModel.registerAccount(registerAccountDto);
      console.log('Registration successful:', response);
      // Handle successful registration (e.g., redirect to login page)

       // Show success alert
       alert('Registration successful!');
      
       // Navigate to login page
       navigate('/login');
      
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message to user)
      alert('Registration failed. Please try again.');
    }
  };

  return <RegisterBox handleSubmit={handleSubmit} />;
};

export default RegisterPage;