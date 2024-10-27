using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DreamBid.Models;
using DreamBid.Data;
using DreamBid.Dtos.User;
using DreamBid.Dtos.Error;
using DreamBid.Mappers;
using DreamBid.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using DreamBid.Dtos.Auction;

namespace DreamBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]  // Only admin can access these endpoints
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IFileManagerService _fileManagerService;
        private readonly ILogger<AdminController> _logger;

        public AdminController(
            UserManager<User> userManager,
            ApplicationDbContext context,
            IFileManagerService fileManagerService,
            ILogger<AdminController> logger)
        {
            _userManager = userManager;
            _context = context;
            _fileManagerService = fileManagerService;
            _logger = logger;
        }

        // GET: api/Admin/users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            try 
            {
                var users = await _userManager.Users
                    .Where(u => u.Email != "admin@dreambid.com")
                    .ToListAsync();

                var userDtos = new List<UserDto>();
                foreach(var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var userDto = user.ToUserDto();
                    userDto.Role = roles.FirstOrDefault() ?? "User";
                    userDtos.Add(userDto);
                }

                return Ok(userDtos);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error getting all users");
                return StatusCode(500, ErrorMessage.ErrorMessageFromString("Internal server error"));
            }
        }

        // DELETE: api/Admin/users/{userId}
        [HttpDelete("users/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound(ErrorMessage.ErrorMessageFromString("User not found"));

            // Don't allow deleting admin
            if (user.UserName.Equals("admin@dreambid.com"))
                return BadRequest(ErrorMessage.ErrorMessageFromString("Cannot delete admin user"));

            // Delete user's profile picture if exists
            if (!string.IsNullOrEmpty(user.ProfilePicuturePath))
            {
                _fileManagerService.RemoveFileWithAnyExtension(user.ProfilePicuturePath);
            }

            // Delete all auctions and their photos for this user
            var userAuctions = await _context.Auctions
                .Where(a => a.UserId == userId)
                .ToListAsync();

            foreach (var auction in userAuctions)
            {
                if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
                {
                    _fileManagerService.RemoveFileWithAnyExtension(auction.AuctionPicturePath);
                }
            }

            // Remove user's bids
            var userBids = await _context.Bids
                .Where(b => b.UserId == userId)
                .ToListAsync();
            _context.Bids.RemoveRange(userBids);

            // Remove user's auctions
            _context.Auctions.RemoveRange(userAuctions);

            // Delete the user
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return StatusCode(500, ErrorMessage.ErrorMessageFromIdentityResult(result));

            await _context.SaveChangesAsync();

            return Ok(user.ToUserDto());
        }

        // GET: api/Admin/auctions
        [HttpGet("auctions")]
        public async Task<ActionResult<IEnumerable<AuctionDto>>> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                .Include(a => a.User)
                .ToListAsync();

            // Load photos for each auction
            foreach (var auction in auctions)
            {
                if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
                {
                    try
                    {
                        var photoBytes = await _fileManagerService.GetFile(auction.AuctionPicturePath);
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
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error loading photo for auction {AuctionId}", auction.Id);
                        auction.PhotoData = null;
                    }
                }
            }

            var auctionDtos = AuctionMapper.ToDtoList(auctions);
            return Ok(auctionDtos);
        }

        // DELETE: api/Admin/auctions/{auctionId}
        [HttpDelete("auctions/{auctionId}")]
        public async Task<IActionResult> DeleteAuction(int auctionId)
        {
            var auction = await _context.Auctions
                .Include(a => a.Bids)
                .FirstOrDefaultAsync(a => a.Id == auctionId);

            if (auction == null)
                return NotFound("Auction not found");

            // Delete auction photo if exists
            if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
            {
                _fileManagerService.RemoveFileWithAnyExtension(auction.AuctionPicturePath);
            }

            // Remove associated bids
            _context.Bids.RemoveRange(auction.Bids);

            // Remove the auction
            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}