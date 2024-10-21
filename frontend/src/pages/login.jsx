import LoginBox from "../features/loginBox";
import AuthViewModel from "../viewModels/AuthViewModel";
import LoginAccountDto from "../dto/auth/loginAccountDto";

const LoginPage = () => {
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    
    try {
      // Create login DTO
      const loginAccountDto = new LoginAccountDto();
      loginAccountDto.email = email;
      loginAccountDto.password = password;
      
      // Call the correct method name
      const response = await AuthViewModel.loginAccount(loginAccountDto);
      
      if ("error" in response) {
        // Handle validation or service errors
        console.error('Login failed:', response.error);
        throw new Error(response.error);
      } else {
        console.log('Login successful:', response);
        // Handle successful login here
        // For example:
        // - Store user data
        // - Redirect to dashboard
      }
      
    } catch (error) {
      console.error('Login error:', error.message);
      throw error; // Re-throw to be handled by LoginBox
    }
  };

  const clickPhoto = (e)=>{
    
  }

  return <LoginBox handleSubmit={handleSubmit} />;
};

export default LoginPage;