import { Api } from "@mui/icons-material";
import AuctionMapper from "../mappers/AuctionMapper";
import AuctionService from "../services/auctionService";
import ErrorMessage from "./ErrorViewModel";

export default class AuctionViewModel {
    static async addAuction(auctionDto) {
        const error = validateAuctionDto(auctionDto);

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
}