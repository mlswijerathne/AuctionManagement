import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AccountViewModel from "../viewModels/AccountViewModel";
import AccountDto from "../dto/account/accountDto";
import ProfileBox from "../features/ProfileBox";
import AuthService from '../services/authService';

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [profileData, setProfileData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Check for token

      if (!token) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        // Fetch profile data
        const response = await AccountViewModel.getAccount();
        if (response && response.error) {
          setError(response.error);
        } else if (response) {
          setProfileData(response);
        } else {
          setError("Failed to fetch profile data");
        }

        // Fetch profile picture
        const pictureResponse = await AccountViewModel.getProfilePicture();
        if (pictureResponse && !pictureResponse.error) {
          setProfilePicture(pictureResponse);
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching profile");
      }
    };

    fetchProfile();
  }, [navigate]); // Add navigate to dependency array

  const handleSubmit = async (formData) => {
    try {
      const accountDto = new AccountDto();
      Object.assign(accountDto, {
        userName: formData.userName,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        DOB: formData.DOB,
        contactNumber: formData.contactNumber,
        address: formData.address,
      });
      
      const response = await AccountViewModel.updateAccount(accountDto);
      
      if (response && response.error) {
        throw new Error(response.error);
      }
      
      setProfileData(response);
      return response;
      
    } catch (error) {
      throw new Error(error.message || "Failed to update profile");
    }
  };

  const handleUpdateProfilePicture = async (file) => {
    try {
      const response = await AccountViewModel.updateProfilePicture(file);
      if (response && response.error) {
        throw new Error(response.error);
      }
      // Refresh the profile picture
      const newPictureResponse = await AccountViewModel.getProfilePicture();
      if (newPictureResponse && !newPictureResponse.error) {
        setProfilePicture(newPictureResponse);
      }
    } catch (error) {
      throw new Error(error.message || "Failed to update profile picture");
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      const response = await AccountViewModel.deleteProfilePicture();
      if (response && response.error) {
        throw new Error(response.error);
      }
      setProfilePicture(null);
    } catch (error) {
      throw new Error(error.message || "Failed to delete profile picture");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileBox 
      handleSubmit={handleSubmit} 
      profileData={profileData} 
      profilePicture={profilePicture}
      onUpdateProfilePicture={handleUpdateProfilePicture}
      onDeleteProfilePicture={handleDeleteProfilePicture}
    />
  );
};

export default ProfilePage;