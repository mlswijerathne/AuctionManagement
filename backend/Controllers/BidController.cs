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
    }
}