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
            
            // Return specific error messages
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
                // Sort bids by date in descending order and amount for same timestamps
                return response.data.bids.sort((a, b) => {
                    const dateComparison = new Date(b.createdAt) - new Date(a.createdAt);
                    if (dateComparison === 0) {
                        return b.amount - a.amount;
                    }
                    return dateComparison;
                });
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
    static async getWonAuctions() {
        try {
            const response = await API.get("/api/Bid/user/won-auctions", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            // Ensure the response data is an array
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                console.warn('Expected won auctions to be an array, received:', response.data);
                return []; // Return an empty array if not an array
            }
        } catch (error) {
            console.error("Error fetching won auctions:", error);
            return {
                error: error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch won auctions"
            };
        }
    }

}
