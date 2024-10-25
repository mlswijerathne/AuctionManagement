import AuctionMapper from "../mappers/AuctionMapper";
import AuctionService from "../services/auctionService";
import ErrorMessage from "./ErrorViewModel";
import { validateCreateAuctionDto } from "../dto/auction/createAuctionDto";
import { validateUpdateAuctionDto } from "../dto/auction/updateAuctionDto";

export default class AuctionViewModel {
    static async addAuction(auctionDto) {
        try {
            console.log("=== AuctionViewModel - Starting validation ===");
            console.log("DTO to validate:", auctionDto);

            const validationError = validateCreateAuctionDto(auctionDto);
            
            if (validationError) {
                console.log("=== Validation failed ===", validationError);
                return ErrorMessage.errorMessageFromJoiError(validationError);
            }

            console.log("=== Validation passed, calling service ===");
            const response = await AuctionService.addAuction(auctionDto);
            
            console.log("=== Service response ===", response);
            if ("error" in response) {
                return ErrorMessage.errorMessageFromString(response.error);
            }

            return AuctionMapper.ToAuctionDto(response);
        } catch (error) {
            console.error("=== Unexpected error in AuctionViewModel ===", error);
            return ErrorMessage.errorMessageFromString(error.message);
        }
    }

    static async getAllAuctions() {
        const response = await AuctionService.getAuctions();

        if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }

        return response.map(auction => AuctionMapper.ToAuctionDto(auction));
    }

    static async getAuction(id) {
        try {
            console.log('ViewModel: Fetching auction with ID:', id);
            
            const response = await AuctionService.getAuction(id);
            console.log('ViewModel: Raw service response:', response);
    
            if ("error" in response) {
                console.error('ViewModel: Error detected:', response);
                return {
                    error: response.error,
                    details: response.details
                };
            }
    
            // Validate required fields before mapping
            if (!response.id || !response.title) {
                console.error('ViewModel: Invalid auction data:', response);
                return {
                    error: 'Invalid auction data received',
                    details: { missingFields: ['id', 'title'].filter(f => !response[f]) }
                };
            }
    
            const mappedData = AuctionMapper.ToAuctionDto(response);
            console.log('ViewModel: Mapped data:', mappedData);
            
            return mappedData;
        } catch (error) {
            console.error('ViewModel: Unexpected error:', error);
            return {
                error: 'An unexpected error occurred',
                details: { message: error.message, stack: error.stack }
            };
        }
    }


    
    static async updateAuction(id, updateAuctionDto) {
        try {
          console.log('ViewModel: Starting auction update for ID:', id);
          
          // Skip Joi validation for FormData
          if (updateAuctionDto instanceof FormData) {
            console.log('ViewModel: Using FormData, skipping Joi validation');
            const response = await AuctionService.updateAuction(id, updateAuctionDto);
            
            if ("error" in response) {
              console.error('ViewModel: Service returned error:', response);
              return {
                error: response.error,
                details: response.details
              };
            }
            
            return AuctionMapper.ToAuctionDto(response);
          }
          
          // Regular validation for non-FormData
          const error = validateUpdateAuctionDto(updateAuctionDto);
          if (error) {
            console.error('ViewModel: Validation error:', error);
            return ErrorMessage.errorMessageFromJoiError(error);
          }
      
          const response = await AuctionService.updateAuction(id, updateAuctionDto);
          console.log('ViewModel: Service response:', response);
          
          if ("error" in response) {
            return ErrorMessage.errorMessageFromString(response.error);
          }
          
          return AuctionMapper.ToAuctionDto(response);
        } catch (error) {
          console.error('ViewModel: Unexpected error:', error);
          return {
            error: 'An unexpected error occurred during update',
            details: error.message
          };
        }
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