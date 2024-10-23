import { Api } from "@mui/icons-material";
import AuctionMapper from "../mappers/AuctionMapper";
import AuctionService from "../services/auctionService";
import ErrorMessage from "./ErrorViewModel";
import { validateCreateAuctionDto } from "../dto/auction/createAuctionDto";
import { validateUpdateAuctionDto } from "../dto/auction/updateAuctionDto";

export default class AuctionViewModel {
    static async addAuction(auctionDto) {
        const error = validateCreateAuctionDto(auctionDto);

        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response = await AuctionService.addAuction(auctionDto);
        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return AuctionMapper.ToAuctionDto(response);
    }

    static async getAllAuctions() {
        const response = await AuctionService.getAllAuction();

        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }

        return response.map(auction => AuctionMapper.ToAuctionDto(auction));
    }

    static async getAuction(id) {
        const response = await AuctionService.getAuction(id);

        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }

        return AuctionMapper.ToAuctionDto(response);
    }

    static async updateAuction(id, updateAuctionDto) {
        const error = validateUpdateAuctionDto(updateAuctionDto);

        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response = await AuctionService.updateAuction(id, updateAuctionDto);
        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return AuctionMapper.ToAuctionDto(response);
    }

    static async deleteAuction(id) {
        const response = await AuctionService.deleteAuction(id);
        
        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        
        return response;
    }

    
    static async getMyAuctionsWithPhotos() {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                return { error: "User not logged in" };
            }
    
            console.log('Fetching auctions for user:', userId);
            const response = await AuctionService.getMyAuctions();

            console.log('Response from getMyAuctions:', response);
            
            if ("error" in response) {
                console.error('Error in getMyAuctions:', response.error);
                return { error: response.error };
            }
    
            if (!Array.isArray(response)) {
                console.error('Invalid response format:', response);
                return { error: "Invalid response format from server" };
            }
    
            // Map auctions and fetch photos concurrently
            const auctionsWithPhotos = await Promise.all(
                response.map(async (auction) => {
                    try {
                        const photoResponse = await AuctionService.getAuctionPhoto(auction.id);

                        if (typeof photoResponse === 'object' && photoResponse !== null && "error" in photoResponse) {
                            console.error('Error fetching auction photo:', photoResponse.error);
                            return {
                                ...AuctionMapper.ToAuctionDto(auction),
                                photoUrl: null // Handle the error appropriately
                            };
                        }

                        const auctionDto = AuctionMapper.ToAuctionDto(auction);
                        return {
                            ...auctionDto,
                            photoUrl: photoResponse // Assuming photoResponse is the URL or valid response
                        };
                    } catch (error) {
                        console.error('Error processing auction:', error);
                        return {
                            ...AuctionMapper.ToAuctionDto(auction),
                            photoUrl: null
                        };
                    }
                })
            );
    
            return auctionsWithPhotos;
        } catch (error) {
            console.error('Error in getMyAuctionsWithPhotos:', error);
            return { error: "Failed to fetch auctions with photos" };
        }
    }
    
}