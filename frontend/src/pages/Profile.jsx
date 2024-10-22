import { useEffect, useState } from "react";
import AccountViewModel from "../viewModels/AccountViewModel";
import AccountDto from "../dto/account/accountDto";
import ProfileBox from "../features/ProfileBox";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AccountViewModel.getAccount();
        // Check if response exists and has an error property
        if (response && response.error) {
          setError(response.error);
        } else if (response) {
          setProfileData(response);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching profile");
      }
    };

    fetchProfile();
  }, []);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return <ProfileBox handleSubmit={handleSubmit} profileData={profileData} />;
};

export default ProfilePage;