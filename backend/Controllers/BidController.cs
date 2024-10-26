using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DreamBid.Models;
using DreamBid.Dtos.Bid;
using DreamBid.Mappers;
using DreamBid.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using DreamBid.Interfaces;
using DreamBid.Service;
using DreamBid.Dtos.Auction;

namespace DreamBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileManagerService _fileManagerService;
        private readonly ILogger<AuctionController> _logger;

         public BidController(ApplicationDbContext context , IFileManagerService fileManagerService, ILogger<AuctionController> logger)
        {
            this._context = context;
            this._fileManagerService = fileManagerService;
            this._logger = logger;

        }

        // POST: api/Bid
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BidDto>> CreateBid(CreateBidDto createBidDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var auction = await _context.Auctions
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == createBidDto.AuctionId);

            if (auction == null)
                return NotFound("Auction not found");

            // Validation checks
            if (auction.UserId == userId)
                return BadRequest("Cannot bid on your own auction");

            if (auction.EndTime <= DateTime.UtcNow)
                return BadRequest("Auction has ended");

            // Check current highest bid
            var highestBid = await _context.Bids
                .Where(b => b.AuctionId == createBidDto.AuctionId)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();

            if (highestBid != null && createBidDto.Amount <= highestBid.Amount)
                return BadRequest($"Bid must be higher than {highestBid.Amount}");

            var bid = BidMapper.ToBid(createBidDto, userId);
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            // Load the user information for the response
            await _context.Entry(bid)
                .Reference(b => b.User)
                .LoadAsync();

            return CreatedAtAction(
                nameof(GetBid),
                new { id = bid.Id },
                BidMapper.ToDto(bid)
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BidDto>> GetBid(int id)
        {
            // var bid = await _context.Bids.FindAsync(id);
            var bid = await _context.Bids
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.Id == id);


            if (bid == null)
            {
                return NotFound();
            }

            return Ok(BidMapper.ToDto(bid));
        }





        // GET: api/Bid/{auctionId}/highest
        [HttpGet("{auctionId}/highest")]
        public async Task<ActionResult<BidDto>> GetHighestBid(int auctionId)
        {
            var highestBid = await _context.Bids
                .Include(b => b.User)
                .Where(b => b.AuctionId == auctionId)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();

            if (highestBid == null)
                return NotFound("No bids found for this auction");

            return Ok(BidMapper.ToDto(highestBid));
        }
        



        // GET: api/Bid/history/{auctionId}
        [HttpGet("auction/{auctionId}")]
            public async Task<ActionResult<BidHistoryDto>> GetBidHistory(int auctionId)
            {
                var bids = await _context.Bids
                    .Include(b => b.User)
                    .Where(b => b.AuctionId == auctionId)
                    .OrderByDescending(b => b.Amount)
                    .ThenByDescending(b => b.BidTime)
                    .ToListAsync();

                // Return empty array instead of NotFound when no bids exist
                return Ok(bids.Any() ? BidMapper.ToBidHistoryDto(bids) : new BidHistoryDto { Bids = new List<BidDto>() });
            }
        




        [HttpGet("user/bids")]
        public async Task<ActionResult<List<BidDto>>> GetUserBids()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var bids = await _context.Bids
                .Include(b => b.User)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.BidTime)
                .ToListAsync();

            return Ok(bids.Select(BidMapper.ToDto));
        }

        // GET: api/Bid/user/won-auctions
            [HttpGet("user/won-auctions")]
            [Authorize]
            public async Task<ActionResult<IEnumerable<AuctionDto>>> GetWonAuctions()
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                // Get all auctions where the user has the highest bid and the auction has ended
                var wonAuctionsIds = await _context.Bids
                    .Where(b => b.UserId == userId)
                    .GroupBy(b => b.AuctionId)
                    .Where(g => g.Max(b => b.Amount) == _context.Bids
                        .Where(b2 => b2.AuctionId == g.Key)
                        .Max(b2 => b2.Amount))
                    .Select(g => g.Key)
                    .ToListAsync();

                var wonAuctions = await _context.Auctions
                    .Where(a => wonAuctionsIds.Contains(a.Id) && a.EndTime <= DateTime.UtcNow)
                    .Include(a => a.User)
                    .ToListAsync();

                // If you're using the same photo handling as in AuctionController
                foreach (var auction in wonAuctions)
                {
                    if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
                    {
                        try
                        {
                            var photoBytes = await _fileManagerService.GetFile(auction.AuctionPicturePath);
                            if (photoBytes != null)
                            {
                                var fileExtension = Path.GetExtension(auction.AuctionPicturePath);
                                var mimeType = fileExtension.ToLower() switch
                                {
                                    ".jpg" or ".jpeg" => "image/jpeg",
                                    ".png" => "image/png",
                                    ".gif" => "image/gif",
                                    _ => "application/octet-stream"
                                };
                                auction.PhotoData = $"data:{mimeType};base64,{Convert.ToBase64String(photoBytes)}";
                            }
                            else
                            {
                                _logger.LogWarning("Photo not found for auction {AuctionId}", auction.Id);
                                auction.PhotoData = null;
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error loading photo for auction {AuctionId}", auction.Id);
                            auction.PhotoData = null;
                        }
                    }
                }

                var auctionDtos = AuctionMapper.ToDtoList(wonAuctions);
                return Ok(auctionDtos);
            }

            
    }
}