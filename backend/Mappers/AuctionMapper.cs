using DreamBid.Models;
using DreamBid.Dtos.Auction;
using System.Collections.Generic;

namespace DreamBid.Mappers
{
    public static class AuctionMapper
    {
        public static Auction ToAuction(CreateAuctionDto createAuctionDto, string userId)
        {
            return new Auction
            {
                Title = createAuctionDto.Title,
                Description = createAuctionDto.Description,
                StartingPrice = createAuctionDto.StartingPrice,
                StartTime = createAuctionDto.StartTime,
                EndTime = createAuctionDto.EndTime,
                UserId = userId
            };
        }

        public static AuctionDto ToDto(Auction auction)
        {
            return new AuctionDto
            {
                Id = auction.Id,
                Title = auction.Title,
                Description = auction.Description,
                StartingPrice = auction.StartingPrice,
                StartTime = auction.StartTime,
                EndTime = auction.EndTime,
                PhotoData = auction.PhotoData
                
            };
        }

        public static List<AuctionDto> ToDtoList(List<Auction> auctions)
        {
            List<AuctionDto> auctionDtos = new List<AuctionDto>();
            foreach (var auction in auctions)
            {
                auctionDtos.Add(ToDto(auction));
            }
            return auctionDtos;
        }

        public static void UpdateAuction(Auction auction, UpdateAuctionDto updateAuctionDto)
        {
            auction.Title = updateAuctionDto.Title;
            auction.Description = updateAuctionDto.Description;
            auction.EndTime = updateAuctionDto.EndTime;
        }
    }
}