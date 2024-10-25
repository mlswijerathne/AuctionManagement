import API from "./api";
import AuthService from "./authService";

export default class AuctionService {
    static async addAuction(createAuctionDto) {
        try {
            const formData = new FormData();
            
            // Append auction data
            Object.keys(createAuctionDto).forEach(key => {
                if (key === 'auctionPicturePath' && createAuctionDto[key]) {
                    formData.append('auctionPicturePath', createAuctionDto[key]);
                } else {
                    formData.append(key, createAuctionDto[key]);
                }
            });

            const response = await API.post("/api/Auction", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
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
            console.log('Auction fetch response:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching auction:', error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auction"
            };
        }
    }

    static async updateAuction(id, updateAuctionDto) {
        try {
            const formData = new FormData();
            
            // Append auction data
            Object.keys(updateAuctionDto).forEach(key => {
                if (key === 'auctionPicturePath' && updateAuctionDto[key]) {
                    formData.append('auctionPicturePath', updateAuctionDto[key]);
                } else {
                    formData.append(key, updateAuctionDto[key]);
                }
            });

            const response = await API.put(`/api/Auction/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to update auction"
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