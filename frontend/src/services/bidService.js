import API from "./api";
import AuthService from "./authService";
import BidDto from '../dto/bid/bidDto';
import BidHistoryDto from '../dto/bid/bidHistoryDto';
import CreateBidDto from '../dto/bid/createBidDto';

export default class BidService {
    static async createBid(createBidDto) {
        try {
            // Add validation before making the API call
            if (!createBidDto.auctionId || !createBidDto.amount || !createBidDto.userId) {
                return { error: "Invalid bid data provided." };
            }

            const response = await API.post("/api/Bid", {
                auctionId: parseInt(createBidDto.auctionId),
                amount: parseFloat(createBidDto.amount),
                userId: createBidDto.userId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Validate the response structure
            if (!response.data || response.data.error) {
                return { 
                    error: response.data.error || "Failed to create bid. Invalid server response."
                };
            }

            // Check for specific error conditions in the response
            if (response.data.isOwner) {
                return { error: "You cannot bid on your own auction." };
            }

            return response.data;
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                const errorData = error.response.data;
                
                // Check for specific error types
                if (errorData.code === "OWNER_BID_ATTEMPT") {
                    return { error: "You cannot bid on your own auction." };
                }
                
                if (errorData.code === "INVALID_BID_AMOUNT") {
                    return { error: "Bid amount must be higher than the current highest bid." };
                }

                // Return the server's error message if available
                if (typeof errorData === 'string') {
                    return { error: errorData };
                } else if (typeof errorData === 'object' && errorData.message) {
                    return { error: errorData.message };
                }
            }
            
            return {
                error: "Failed to create bid. Please try again."
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

    static async getWinningBids() {
        try {
            const response = await API.get("/api/Bid/user/winning-bids", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("=== Get Winning Bids Error ===", error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch winning bids"
            };
        }
    }
    
    static async checkoutBid(bidId) {
        try {
            const response = await API.post(`/api/Bid/${bidId}/checkout`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            return response.data;
        } catch (error) {
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to checkout bid"
            };
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
