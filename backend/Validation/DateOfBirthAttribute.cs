using System.ComponentModel.DataAnnotations;

namespace DreamBid.Validation
{
    public class DateOfBirthAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime dateOfBirth)
            {
                if (dateOfBirth >= DateTime.Today)
                {
                    return new ValidationResult("Date of Birth must be less than today's date.");
                }
            }
            return ValidationResult.Success;
        }
    }
}