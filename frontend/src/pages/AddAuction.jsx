import { useNavigate } from "react-router-dom";
import AddAuctionBox from "../features/AddAuctionBox";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import CreateAuctionDto from "../dto/auction/createAuctionDto";

const AddAuctionPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            console.log('=== AddAuction Page - Starting Submission ===');
            
            // Create a new FormData object if formData isn't already one
            const finalFormData = formData instanceof FormData ? formData : new FormData();
            
            // Log the incoming FormData
            finalFormData.forEach((value, key) => {
                console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
            });

            const createAuctionDto = new CreateAuctionDto();
            createAuctionDto.title = finalFormData.get('title');
            createAuctionDto.description = finalFormData.get('description');
            createAuctionDto.startingPrice = parseFloat(finalFormData.get('startingPrice'));
            createAuctionDto.startTime = finalFormData.get('startingTime');
            createAuctionDto.endTime = finalFormData.get('endTime');
            createAuctionDto.auctionPicturePath = finalFormData.get('auctionPicturePath');

            console.log('=== Created DTO ===', createAuctionDto);

            const response = await AuctionViewModel.addAuction(createAuctionDto);
            console.log('=== ViewModel Response ===', response);

            if (response && response.error) {
                throw new Error(response.error);
            }

            navigate('/allAuctions'); // Added forward slash for absolute path
            return response;
        } catch (error) {
            console.error('=== Error in handleSubmit ===', {
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    };

    // Pass handleSubmit as the onSubmit prop
    return (
        <div>
            <AddAuctionBox onSubmit={handleSubmit} />
        </div>
    );
};

export default AddAuctionPage;