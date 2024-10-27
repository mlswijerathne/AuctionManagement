import API from "./api";

export default class AdminService {
    static async getAllUsers() {
        try {
            const response = await API.get("/api/Admin/users");
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch users"
            };
        }
    }

    static async deleteUser(userId) {
        try {
            const response = await API.delete(`/api/Admin/users/${userId}`);
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to delete user"
            };
        }
    }

    static async getAllAuctions() {
        try {
            const response = await API.get("/api/Admin/auctions");
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch auctions"
            };
        }
    }

    static async deleteAuction(auctionId) {
        try {
            const response = await API.delete(`/api/Admin/auctions/${auctionId}`);
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