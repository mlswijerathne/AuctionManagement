using Microsoft.AspNetCore.Identity;

namespace DreamBid.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
        public string? ProfilePicuturePath { get; set; }
        
    }
}