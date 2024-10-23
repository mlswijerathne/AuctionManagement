import React, { useState, useEffect } from "react";
import EditProfileBox from "../features/EditProfileBox";
import AccountViewModel from "../viewModels/AccountViewModel";
import UpdateAccountDto from "../dto/account/updateAccountDto";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    contactNumber: "",
    address: "",
  });

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await AccountViewModel.updateAccount();
      if (!("error" in response)) {
        setProfileData(response);
      } else {
        console.error('Failed to fetch account data:', response.error);
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };
  
  const handleSubmit = async (formData) => {
      
      const updateAccountDto = new UpdateAccountDto();
      updateAccountDto.firstName = formData.firstName;
      updateAccountDto.lastName = formData.lastName;
      updateAccountDto.DOB = formData.DOB;
      updateAccountDto.contactNumber = formData.contactNumber;
      updateAccountDto.address = formData.address;
      const response = await AccountViewModel.updateAccount(updateAccountDto);
      
      if ("error" in response) {
        console.error('Profile update failed:', response.error);
      } else {
        console.log('Profile update successful:', response);
        setProfileData(response);
        return response; // Return the response for potential use in EditProfileBox
      }
  };

  return <EditProfileBox handleSubmit={handleSubmit} profileData={profileData} />;
};

export default EditProfile;