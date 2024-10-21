import AuctionForm from "../features/AuctionForm";
import AuctionViewModel from "../viewModels/AuctionViewModel";
import AuctionItemDto from "../dto/auction/auctionItemDto";

const AuctionPage = () => {
  const handleSubmit = async (e, auctionData) => {
    e.preventDefault();

    try {
      // Create auction item DTO
      const auctionItemDto = new AuctionItemDto();
      auctionItemDto.title = auctionData.title;
      auctionItemDto.description = auctionData.description;
      auctionItemDto.startingBid = auctionData.startingBid;
      auctionItemDto.auctionEndDate = auctionData.auctionEndDate;

      // Call the method to add auction item
      const response = await AuctionViewModel.addAuctionItem(auctionItemDto);

      if ("error" in response) {
        throw new Error(response.error);
      } else {
        console.log('Auction item added successfully:', response);
        // Handle successful addition (e.g., redirect or show a success message)
      }
    } catch (error) {
      console.error('Error adding auction item:', error.message);
      throw error; // Handle this in the AuctionForm if needed
    }
  };

  return <AuctionForm handleSubmit={handleSubmit} />;
};

export default AuctionPage;

