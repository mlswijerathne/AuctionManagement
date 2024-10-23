using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DreamBid.Models;
using DreamBid.Dtos.Auction;
using DreamBid.Mappers;
using DreamBid.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DreamBid.Interfaces;
using HeyRed.Mime;
using DreamBid.Utils;

namespace DreamBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileManagerService _fileManagerService;
         private readonly ILogger<AuctionController> _logger;
        private readonly string _auctionPicturePath = FileManagementUtil.GetOsDependentPath("aution/");

        public AuctionController(ApplicationDbContext context , IFileManagerService fileManagerService, ILogger<AuctionController> logger)
        {
            this._context = context;
            this._fileManagerService = fileManagerService;
            this._logger = logger;

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
            //handle photo upload
            if (createAuctionDto.AuctionPicturePath != null && createAuctionDto.AuctionPicturePath.Length > 0)
            {
                    var basepath = FileManagementUtil.GetOsDependentPath($"aution/{auction.Id}");
                    var fileName = $"auction_{Guid.NewGuid()}{Path.GetExtension(createAuctionDto.AuctionPicturePath.FileName)}";
                    var subFilePathName = Path.Combine(basepath, fileName);

                    var newFilePath = await _fileManagerService.StoreFile(createAuctionDto.AuctionPicturePath, subFilePathName,this._logger, true);
                    if (newFilePath != null)
                    {
                        auction.AuctionPicturePath = newFilePath;
                        _context.Auctions.Update(auction);
                        await _context.SaveChangesAsync(); 
                    }
                    else
                    {
                        _logger.LogError("Failed to store auction photo during creation");
                    }
               
            }
            

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

            foreach (var auction in auctions)
            {
                if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
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
                else{
                    // Log or handle the error
                    _logger.LogError("Error loading photo: either file path is empty or file bytes could not be retrieved.");
                    auction.PhotoData = null;
                }
            }

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
    
    // Handle photo retrieval
    if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
    {
        var photoBytes = await _fileManagerService.GetFile(auction.AuctionPicturePath);
        
        if (photoBytes == null)
        {
            _logger.LogError("Unable to load photo from path: {AuctionPicturePath}", auction.AuctionPicturePath);
            auction.PhotoData = null;
        }
        else
        {
            var fileExtension = Path.GetExtension(auction.AuctionPicturePath).ToLower();
            var mimeType = fileExtension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
            auction.PhotoData = $"data:{mimeType};base64,{Convert.ToBase64String(photoBytes)}";
        }
    }
    else
    {
        _logger.LogWarning("Auction {AuctionId} does not have a picture path.", auction.Id);
        auction.PhotoData = null;
    }

    return Ok(AuctionMapper.ToDto(auction));
}

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AuctionDto>> GetAuction(int id)
        // {
        //     var auction = await _context.Auctions.FindAsync(id);

        //     if (auction == null)
        //     {
        //         return NotFound();
        //     }
            
        //     // Handle photo retrieval
        //     if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
        //     {
                
        //             var photoBytes = await _fileManagerService.GetFile(auction.AuctionPicturePath);
        //             var fileExtension = Path.GetExtension(auction.AuctionPicturePath);
        //             var mimeType = fileExtension.ToLower() switch
        //             {
        //                 ".jpg" or ".jpeg" => "image/jpeg",
        //                 ".png" => "image/png",
        //                 ".gif" => "image/gif",
        //                 _ => "application/octet-stream"
        //             };
        //             auction.PhotoData = $"data:{mimeType};base64,{Convert.ToBase64String(photoBytes)}";
                
        //     }
        //     else {
        //          _logger.LogError("Error loading photo for auction {AuctionId}", auction.Id);
        //         auction.PhotoData = null;
        //     }

        //     return Ok(AuctionMapper.ToDto(auction));
        // }

        

        // PUT: api/Auction/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAuction(int id, [FromForm]UpdateAuctionDto updateAuctionDto)
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
             // Update basic auction properties
            AuctionMapper.UpdateAuction(auction, updateAuctionDto);

             // Handle photo update if provided
            if (updateAuctionDto.AuctionPicturePath != null && updateAuctionDto.AuctionPicturePath.Length > 0)
            {
            
                    // Remove existing photo if exists
                    if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
                    {
                        _fileManagerService.RemoveFileWithAnyExtension(auction.AuctionPicturePath);
                    }

                    // Upload new photo
                    var fileName = $"auction_{auction.Id}_{Guid.NewGuid()}{Path.GetExtension(updateAuctionDto.AuctionPicturePath.FileName)}";
                    var subFilePathName = Path.Combine("auction", auction.Id.ToString(), fileName);

                    var newFilePath = await _fileManagerService.StoreFile(updateAuctionDto.AuctionPicturePath, subFilePathName,this._logger, true);
                    if (newFilePath != null)
                    {
                        auction.AuctionPicturePath = newFilePath;
                    }
                    else
                    {
                        _logger.LogError($"Failed to store updated photo for auction {id}");
                    }
                
            }

            await _context.SaveChangesAsync();
            
                if (!AuctionExists(id))
                {
                    return NotFound();
                }
    
                return NoContent();
        }

        [HttpGet("{id}/photo")]
        public async Task<IActionResult> GetAuctionPhoto(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            
            if (auction == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(auction.AuctionPicturePath))
            {
                return NotFound("No photo available for this auction");
            }

            var fileBytes = await _fileManagerService.GetFile(auction.AuctionPicturePath);

            if (fileBytes == null)
            {
                return NotFound("Photo file not found");
            }

            return File(fileBytes, MimeTypesMap.GetMimeType(auction.AuctionPicturePath));
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
             if (!string.IsNullOrEmpty(auction.AuctionPicturePath))
            {
                _fileManagerService.RemoveFileWithAnyExtension(auction.AuctionPicturePath);
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