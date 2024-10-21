using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DreamBid.Dtos.Auction
{
    public class UpdateAuctionDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }
        public DateTime EndTime { get; set; }
        

    }
}