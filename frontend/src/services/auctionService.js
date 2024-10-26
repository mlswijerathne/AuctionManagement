import API from "./api";
import AuthService from "./authService";

export default class AuctionService {
    static async addAuction(createAuctionDto) {
        try {
            console.log("=== AuctionService - Starting addAuction ===");
            console.log("Incoming DTO:", createAuctionDto);
    
            const formData = new FormData();
            
            console.log("=== Building FormData ===");
            Object.keys(createAuctionDto).forEach(key => {
                const value = createAuctionDto[key];
                console.log(`Adding ${key}:`, value instanceof File ? `File: ${value.name}` : value);
                
                if (key === 'auctionPicturePath' && value) {
                    formData.append('auctionPicturePath', value);
                } else {
                    formData.append(key, value);
                }
            });
    
            console.log("=== Making API Request ===");
            const response = await API.post("/api/Auction", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            console.log("=== API Response ===", response.data);
            return response.data;
        } catch (error) {
            console.error("=== API Error ===", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to create auction"
            };
        }
    }

    static async getAuctions() {
        try {
            console.log('Fetching auctions');
            const response = await API.get("/api/Auction");
            console.log('Auctions response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Auctions fetch error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auctions"
            };
        }
    }

    static async getMyAuctions() {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching auctions for user:', userId);

            const response = await API.get("/api/Auction/my");
            console.log('Auctions response:', response.data);

            return response.data;
        } catch (error) {
            console.error('Error in getMyAuctions:', error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auctions"
            };
        }
    }

    static async getAuctionPhoto(auctionId) {
        try {
            console.log('Fetching photo for auction:', auctionId);
            if (!auctionId) {
                throw new Error('Invalid auction ID');
            }

            const response = await API.get(`/api/Auction/${auctionId}/photo`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if you're using JWT
                }
            });

            if (!response.data) {
                throw new Error('No photo data received');
            }

            console.log('Photo fetched successfully for auction:', auctionId);
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching auction photo:', error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       `Failed to fetch photo for auction ${auctionId}`
            };
        }
    }

    static async getAuction(id) {
        try {
            const response = await API.get(`/api/Auction/${id}`);
            console.log('Auction fetch response:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });
            
            // Validate response data
            if (!response.data) {
                throw new Error('No data received from server');
            }
            
            return response.data;
        } catch (error) {
            console.error('Detailed fetch error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                stack: error.stack
            });
            
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auction",
                details: error.response?.data
            };
        }
    }

    

    static async updateAuction(id, updateAuctionDto) {
        try {
          console.log('Service: Starting auction update for ID:', id);
          
          let formData;
          if (updateAuctionDto instanceof FormData) {
            formData = updateAuctionDto;
            console.log('Service: Using provided FormData');
          } else {
            formData = new FormData();
            Object.entries(updateAuctionDto).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                formData.append(key, value);
              }
            });
            console.log('Service: Created new FormData from DTO');
          }
      
          const response = await API.put(`/api/Auction/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
      
          console.log('Service: Update successful:', response.data);
          return response.data;
        } catch (error) {
          console.error('Service: Error during update:', error);
          return {
            error: error.response?.data?.message || 
                   error.message || 
                   "Failed to update auction",
            details: error.response?.data
          };
        }
      }




    static async deleteAuction(id) {
        try {
            const response = await API.delete(`/api/Auction/${id}`);
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to delete auction"
            };
        }
    }

}