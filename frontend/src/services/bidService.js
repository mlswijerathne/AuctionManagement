import API from "./api";
import AuthService from "./authService";
import BidDto from '../dto/bid/bidDto';
import BidHistoryDto from '../dto/bid/bidHistoryDto';
import CreateBidDto from '../dto/bid/createBidDto';

export default class BidService {
    static async createBid(createBidDto) {
        try {
            console.log("=== BidService - Starting createBid ===");
            console.log("Incoming DTO:", createBidDto);
    
            // Validate the data before sending
            if (!createBidDto.auctionId || !createBidDto.amount) {
                throw new Error("Invalid bid data: auctionId and amount are required");
            }
    
            const response = await API.post("/api/Bid", {
                auctionId: parseInt(createBidDto.auctionId),
                amount: parseFloat(createBidDto.amount)
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            console.log("=== Bid Created Successfully ===", response.data);
            return response.data;
        } catch (error) {
            console.error("=== Create Bid Error ===", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // Return more specific error messages
            return {
                error: error.response?.data || 
                       error.message || 
                       "Failed to create bid"
            };
        }
    }


    static async getBid(id) {
        try {
            console.log("Fetching bid with ID:", id);

            const response = await API.get(`/api/Bid/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("=== Bid Retrieved ===", response.data);
            return response.data;
        } catch (error) {
            console.error("=== Get Bid Error ===", error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch bid"
            };
        }
    }

    // static async getHighestBid(auctionId) {
    //     try {
    //         console.log("Fetching highest bid for auction:", auctionId);

    //         const response = await API.get(`/api/Bid/${auctionId}/highest`);
    //         console.log("=== Highest Bid Retrieved ===", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error("=== Get Highest Bid Error ===", error);
    //         return {
    //             error: error.response?.data?.message || 
    //                    error.message || 
    //                    "Failed to fetch highest bid"
    //         };
    //     }
    // }
    static async getHighestBid(auctionId) {
        try {
            const bidHistory = await this.getBidHistory(auctionId);
            if (bidHistory && bidHistory.length > 0) {
                return bidHistory[0]; // Since bids are ordered by amount desc
            }
            return null;
        } catch (error) {
            console.error('Error fetching highest bid:', error);
            return null;
        }
    }


    static async getBidHistory(auctionId) {
        try {
            const response = await API.get(`/api/Bid/auction/${auctionId}`);
            if (response.data && Array.isArray(response.data.bids)) {
                return response.data.bids;
            }
            return [];
        } catch (error) {
            console.error('Error fetching bid history:', error);
            return [];
        }
    }

    static async getUserBids() {
        try {
            const userId = localStorage.getItem('userId');
            console.log("Fetching bids for user:", userId);

            const response = await API.get("/api/Bid/user/bids", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("=== User Bids Retrieved ===", response.data);
            return response.data;
        } catch (error) {
            console.error("=== Get User Bids Error ===", error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch user bids"
            };
        }
    }
}
