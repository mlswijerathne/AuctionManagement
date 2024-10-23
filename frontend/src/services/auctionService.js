import API from "./api";

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
            console.log('Auctions response:', response);
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

    static async getAuction(id) {
        try {
            const response = await API.get(`/api/Auction/${id}`);
            return response.data;
        } catch (error) {
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

    static async getAuctionPhoto(id) {
        try {
            const response = await API.get(`/api/Auction/${id}/photo`, {
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            return imageUrl;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auction photo"
            };
        }
    }
}