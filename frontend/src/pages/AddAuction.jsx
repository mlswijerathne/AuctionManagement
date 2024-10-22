import AddAuctionBox from "../components/AddAuctionBox";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import CreateAuctionDto from "../dto/auction/createAuctionDto";

const AuctionPage = () => {
  const handleSubmit = async (e, auctionData) => {
    e.preventDefault();

    
      // Create auction item DTO
      const createAuctionDto = new CreateAuctionDto();
      createAuctionDto.title = auctionData.title;
      createAuctionDto.description = auctionData.description;
      createAuctionDto.startingPrice = parseFloat(auctionData.startingPrice); // Ensure this is a number
      createAuctionDto.startTime = auctionData.startingTime; // Date string
      createAuctionDto.endTime = auctionData.endTime; // Date string
      createAuctionDto.imageUrl = auctionData.imgUrl; // Use the correct key

      // Call the method to add auction item
      const response = await AuctionViewModel.addAuction(createAuctionDto);

      if ("error" in response) {
        throw new Error(response.error);
      } else {
        console.log('Auction item added successfully:', response);
        // You may want to reset the form, redirect, or show a success message
        // Optionally, you can reset the form here or perform another action
      }

  };

  return <AddAuctionBox handleSubmit={handleSubmit} />
  
};

export default AuctionPage;
