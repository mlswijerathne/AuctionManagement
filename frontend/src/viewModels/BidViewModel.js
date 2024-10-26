// viewmodels/BidViewModel.js
import BidService from "../services/bidService";
import ErrorMessage from "./ErrorViewModel";
import { validateCreateBidDto } from "../dto/bid/createBidDto";
import BidMapper from "../mappers/BidMapper";

export default class BidViewModel {
    // Add a new bid with validation
    static async addBid(bidDto) {
        try {
            console.log("=== BidViewModel - Starting validation ===");
            const validationError = validateCreateBidDto(bidDto);

            if (validationError) {
                console.log("=== Validation failed ===", validationError);
                return ErrorMessage.errorMessageFromJoiError(validationError);
            }

            console.log("=== Validation passed, calling service ===");
            const response = await BidService.addBid(bidDto);

            if ("error" in response) {
                return ErrorMessage.errorMessageFromString(response.error);
            }

            return BidMapper.ToBidDto(response);
        } catch (error) {
            console.error("=== Unexpected error in BidViewModel ===", error);
            return ErrorMessage.errorMessageFromString(error.message);
        }
    }

    // Fetch all bids with sorting and filtering
    static async getBids(sortBy = 'date', filterCriteria = {}) {
        try {
            const response = await BidService.getBids(sortBy, filterCriteria);

            if ("error" in response) {
                return ErrorMessage.errorMessageFromString(response.error);
            }

            return response.map(bid => BidMapper.ToBidDto(bid));
        } catch (error) {
            console.error("BidViewModel: Failed to get bids", error);
            return { error: error.message };
        }
    }

    // Get a specific bid by ID and start countdown if applicable
    static async getBidWithCountdown(bidId) {
        try {
            const bid = await BidService.getBid(bidId);
            if ("error" in bid) {
                return { error: bid.error };
            }

            const countdown = await BidService.getBidCountdown(bidId);
            return { bid: BidMapper.ToBidDto(bid), countdown };
        } catch (error) {
            console.error("BidViewModel: Error in fetching bid countdown", error);
            return { error: error.message };
        }
    }

    // Fetch bid history with sorting and filtering
    static async getBidHistory(sortBy = 'date', filterCriteria = {}) {
        return await this.getBids(sortBy, filterCriteria);
    }

    // Listen to bid notifications
    static async subscribeToBidNotifications(bidId, callback) {
        try {
            await BidService.subscribeToBidNotifications(bidId, (notificationData) => {
                callback(notificationData);
            });
        } catch (error) {
            console.error("BidViewModel: Failed to subscribe to bid notifications", error);
            return { error: error.message };
        }
    }
}
