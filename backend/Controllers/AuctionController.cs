using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DreamBid.Models;
using DreamBid.Dtos.Auction;
using DreamBid.Mappers;
using DreamBid.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace DreamBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuctionController(ApplicationDbContext context)
        {
            _context = context;
        }


        // POST: api/Auction
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var auction = AuctionMapper.ToAuction(createAuctionDto, userId);
            
            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();

            var auctionDto = AuctionMapper.ToDto(auction);

            return CreatedAtAction(
                nameof(GetAuction),
                new { id = auction.Id },
                auctionDto
            );
        }

        
        // GET: api/Auction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionDto>>> GetAuctions()
        {
            var auctions = await _context.Auctions.ToListAsync();
            var auctionDtos = AuctionMapper.ToDtoList(auctions);
            return Ok(auctionDtos);
        }

        // GET: api/Auction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuction(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);

            if (auction == null)
            {
                return NotFound();
            }

            return Ok(AuctionMapper.ToDto(auction));
        }

        

        // PUT: api/Auction/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAuction(int id, UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _context.Auctions.FindAsync(id);
            
            if (auction == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (auction.UserId != userId)
            {
                return Forbid();
            }

            AuctionMapper.UpdateAuction(auction, updateAuctionDto);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Auction/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            
            if (auction == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (auction.UserId != userId)
            {
                return Forbid();
            }

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuctionExists(int id)
        {
            return _context.Auctions.Any(e => e.Id == id);
        }
    }
}