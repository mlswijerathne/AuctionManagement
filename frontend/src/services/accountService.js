// accountService.js
import API from "./api";

export default class AccountService {
    static async getAccount() {
        try {
            // Log the exact URL being called
            console.log('Calling getAccount endpoint');
            
            // Get the exact endpoint path from Swagger
            const response = await API.get("/api/v1/accounts/me");
            console.log('Account response:', response);
            return response.data;
        } catch (error) {
            console.error('Account fetch error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch account"
            };
        }
    }
    static async updateAccount(updateAccountDto) {
        try {
            
            const response = await API.post("/api/v1/accounts/me", updateAccountDto);
            
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to update account"
            };
        }
    }

    static async deleteAccount() {
        try {
            const response = await API.delete("/api/v1/accounts/me");
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to delete account"
            };
        }
    }

    static async getProfilePicture() {
        try {
            const response = await API.get("/api/v1/accounts/me/profilePicture",{
                responseType: 'blob' // This ensures the response is treated as a binary large object (Blob)
        });
        // Create a URL for the image from the response blob   
        const imageUrl = URL.createObjectURL(response.data);
        
        return imageUrl;// Return the image URL for rendering in the frontend
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch profile picture"
            };
        }
    }

    static async updateProfilePicture(file) {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('profilePicture', file);
            }
            
            const response = await API.post("/api/v1/accounts/me/profilePicture", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to update profile picture"
            };
        }
    }

    static async deleteProfilePicture() {
        try {
            const response = await API.delete("/api/v1/accounts/me/profilePicture");
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to delete profile picture"
            };
        }
    }
}