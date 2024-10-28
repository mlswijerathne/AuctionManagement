import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BidService from '../services/bidService';
import AuctionService from '../services/auctionService';
import CreateBidDto from '../dto/bid/createBidDto';
import BidSectionBox from '../features/BidSectionBox';

const BidSection = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [bidHistory, setBidHistory] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userId = localStorage.getItem('userId');

    const refreshBidData = useCallback(async () => {
        try {
            const highestBidData = await BidService.getHighestBid(auctionId);
            if (highestBidData && !highestBidData.error) {
                setHighestBid(highestBidData);
            }

            const bidHistoryData = await BidService.getBidHistory(auctionId);
            if (bidHistoryData && Array.isArray(bidHistoryData)) {
                setBidHistory(bidHistoryData);
            } else if (bidHistoryData && !bidHistoryData.error) {
                setBidHistory(bidHistoryData.bids || []);
            }
        } catch (err) {
            console.error("Error refreshing bid data:", err);
        }
    }, [auctionId]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const auctionData = await AuctionService.getAuction(auctionId);
                if (auctionData && !auctionData.error) {
                    setAuction(auctionData);
                    const isOwnerCheck = String(auctionData.ownerId).toLowerCase() === String(userId).toLowerCase();
                    setIsOwner(isOwnerCheck);
                }
                await refreshBidData();
            } catch (err) {
                console.error("Error fetching auction or bid data:", err);
                setError("Failed to load auction or bid information.");
                setBidHistory([]);
            }
        };

        fetchAuctionDetails();
    }, [auctionId, userId, refreshBidData]);

    const handleBidAmountChange = (value) => {
        setBidAmount(value);
        setError('');
        setSuccess('');
    };

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        // 1. Validate ownership first
        if (!auction || !userId) {
            setError("Unable to verify auction details. Please try again.");
            return;
        }
    
        if (String(auction.ownerId).toLowerCase() === String(userId).toLowerCase()) {
            setError("You cannot place a bid on your own auction.");
            return;
        }
    
        // 2. Validate bid amount
        const bidAmountFloat = parseFloat(bidAmount);
        if (!bidAmount || isNaN(bidAmountFloat) || bidAmountFloat <= 0) {
            setError("Please enter a valid bid amount.");
            return;
        }
    
        if (highestBid && bidAmountFloat <= highestBid.amount) {
            setError(`Bid must be higher than current highest bid: $${highestBid.amount}`);
            return;
        }
    
        try {
            const createBidDto = new CreateBidDto();
            createBidDto.auctionId = parseInt(auctionId);
            createBidDto.amount = bidAmountFloat;
            createBidDto.userId = userId; // Add userId for additional server-side validation
    
            const response = await BidService.createBid(createBidDto);
            
            if (response.error) {
                setError(response.error);
                return;
            }
    
            // Only set success if we have a valid bid response
            if (response.id || response.bidId) {
                setSuccess('Bid placed successfully!');
                setBidAmount('');
                await refreshBidData();
            } else {
                setError("Invalid response from server. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    if (!auction) {
        return null;
    }

    return (
        <BidSectionBox
            bidAmount={bidAmount}
            onBidAmountChange={handleBidAmountChange}
            onBidSubmit={handleBidSubmit}
            error={error}
            success={success}
            highestBid={highestBid}
            bidHistory={bidHistory || []}
            isOwner={isOwner}
            startingPrice={auction.startingPrice}
        />
    );
};

export default BidSection;