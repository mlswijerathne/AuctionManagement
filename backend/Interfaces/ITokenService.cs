using DreamBid.Models;

namespace DreamBid.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user, String role);
    }
}