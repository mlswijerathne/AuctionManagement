import { useNavigate } from "react-router-dom";
import AddAuctionBox from "../features/AddAuctionBox";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import CreateAuctionDto from "../dto/auction/createAuctionDto";

const AddAuctionPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            console.log('=== AddAuction Page - Starting Submission ===');
            
            // Log the incoming FormData
            console.log("Incoming FormData contents:");
            formData.forEach((value, key) => {
                console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
            });

            const createAuctionDto = new CreateAuctionDto();
            createAuctionDto.title = formData.get('title');
            createAuctionDto.description = formData.get('description');
            createAuctionDto.startingPrice = parseFloat(formData.get('startingPrice'));
            createAuctionDto.startTime = formData.get('startingTime');
            createAuctionDto.endTime = formData.get('endTime');
            createAuctionDto.auctionPicturePath = formData.get('auctionPicturePath');

            console.log('=== Created DTO ===', createAuctionDto);

            const response = await AuctionViewModel.addAuction(createAuctionDto);
            console.log('=== ViewModel Response ===', response);

            if (response && response.error) {
                throw new Error(response.error);
            }

            navigate('allAuctions');
            return response;
        } catch (error) {
            console.error('=== Error in handleSubmit ===', {
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    };

    return (
        <div>
            <AddAuctionBox onSubmit={handleSubmit} />
        </div>
    );
};

export default AddAuctionPage;