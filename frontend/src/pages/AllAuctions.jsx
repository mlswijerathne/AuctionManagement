import { useEffect, useState } from 'react';
import AllAuctionsBox from '../features/AllAuctionsBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import AuctionService from '../services/auctionService';

const AllAuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await AuctionViewModel.getAllAuctions();
        if ("error" in response) {
          setError(response.error);
          return;
        }

         // Log the auctions response to check the IDs
         console.log('Fetched auctions:', response);

        // Fetch photos for all auctions concurrently
        const auctionsWithPhotos = await Promise.all(
          response.map(async (auction) => {
            // Log the auction ID
            console.log('Auction ID:', auction.id);
    
            if (!auction.id) {
              console.error('Invalid auction ID:', auction);
              return {
                ...auction,
                photoUrl: null
              };
            }
    
            try {
              const photoUrl = await AuctionService.getAuctionPhoto(auction.id);
              return {
                ...auction,
                photoUrl: photoUrl.error ? null : photoUrl
              };
            } catch (err) {
              console.error(`Error fetching photo for auction ${auction.id}:`, err);
              return {
                ...auction,
                photoUrl: null
              };
            }
          })
        );

        setAuctions(auctionsWithPhotos);
      } catch (err) {
        setError('Failed to fetch auctions. Please try again later.');
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <AllAuctionsBox 
      auctions={auctions} 
      error={error} 
      loading={loading}
    />
  );
};

export default AllAuctionsPage;