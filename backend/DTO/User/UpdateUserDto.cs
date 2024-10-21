using System.ComponentModel.DataAnnotations;
using DreamBid.Validation;

namespace DreamBid.Dtos.User
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [DateOfBirth]
        public DateTime? DOB { get; set; }

        public string ContactNumber { get; set; }   
        public string Address { get; set; }

    }
}