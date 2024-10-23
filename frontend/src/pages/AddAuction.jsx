import { useNavigate } from "react-router-dom";
import AddAuctionBox from "../features/AddAuctionBox";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import CreateAuctionDto from "../dto/auction/createAuctionDto";

const AddAuctionPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            console.log('Starting auction submission...');
            
            const createAuctionDto = new CreateAuctionDto();
            createAuctionDto.title = formData.get('title');
            createAuctionDto.description = formData.get('description');
            createAuctionDto.startingPrice = parseFloat(formData.get('startingPrice'));
            createAuctionDto.startTime = formData.get('startTime');
            createAuctionDto.endTime = formData.get('endTime');
            createAuctionDto.auctionPicturePath = formData.get('auctionPicturePath');

            console.log('Created DTO:', createAuctionDto);

            const response = await AuctionViewModel.addAuction(createAuctionDto);
            console.log('Submission response:', response);

            if ("error" in response) {
                throw new Error(response.error);
            }

            console.log('Auction added successfully:', response);
            navigate('/auctions'); // Redirect to auctions list after successful submission
            return response;
        } catch (error) {
            console.error('Error in handleSubmit:', error);
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