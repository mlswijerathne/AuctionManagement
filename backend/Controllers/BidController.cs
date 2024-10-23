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

namespace DreamBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BidController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Bid
        [HttpPost]
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
        // [HttpPost]
        // [Authorize]
        // public async Task<ActionResult<BidDto>> CreateBid(CreateBidDto createBidDto)
        // {
        //     var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //     if (string.IsNullOrEmpty(userId))
        //     {
        //         return Unauthorized();
        //     }

        //     var auction = await _context.Auctions.FindAsync(createBidDto.AuctionId);
        //     if (auction == null)
        //     {
        //         return NotFound("Auction not found");
        //     }

        //     // Ensure the bid is higher than the current highest bid
        //     var highestBid = await _context.Bids
        //         .Where(b => b.AuctionId == createBidDto.AuctionId)
        //         .OrderByDescending(b => b.Amount)
        //         .FirstOrDefaultAsync();

        //     if (highestBid != null && createBidDto.Amount <= highestBid.Amount)
        //     {
        //         return BadRequest("Bid amount must be higher than the current highest bid.");
        //     }

        //     var bid = BidMapper.ToBid(createBidDto, userId);
        //     bid.IsAutoBid = createBidDto.MaxBid.HasValue; // Set if this is an auto bid

        //     // If it's an auto bid, handle the logic to place automatic bids
        //     if (createBidDto.MaxBid.HasValue)
        //     {
        //         await HandleAutoBidding(createBidDto, auction.Id, userId);
        //         return Ok("Auto-bidding is now active up to your maximum limit.");
        //     }

        //     _context.Bids.Add(bid);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(
        //         nameof(GetBid),
        //         new { id = bid.Id },
        //         BidMapper.ToDto(bid)
        //     );
        // }






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
        // [HttpGet("{auctionId}/highest")]
        // public async Task<ActionResult<BidDto>> GetHighestBid(int auctionId)
        // {
        //     var highestBid = await _context.Bids
        //         .Where(b => b.AuctionId == auctionId)
        //         .OrderByDescending(b => b.Amount)
        //         .FirstOrDefaultAsync();

        //     if (highestBid == null)
        //     {
        //         return NotFound("No bids found for this auction.");
        //     }

        //     return Ok(BidMapper.ToDto(highestBid));
        // }





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

            if (!bids.Any())
                return NotFound("No bids found for this auction");

            return Ok(BidMapper.ToBidHistoryDto(bids));
        }
        // [HttpGet("history/{auctionId}")]
        // public async Task<ActionResult<IEnumerable<BidDto>>> GetBidHistory(int auctionId)
        // {
        //     var bids = await _context.Bids
        //         .Where(b => b.AuctionId == auctionId)
        //         .OrderBy(b => b.BidTime)
        //         .ToListAsync();

        //     return Ok(bids.Select(BidMapper.ToDto));
        // }





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
    }
}