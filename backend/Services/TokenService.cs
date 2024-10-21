using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DreamBid.Interfaces;
using DreamBid.Models;
using Microsoft.IdentityModel.Tokens;

namespace DreamBid.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        //  This is a dependency injection of the IConfiguration interface, which allows access to the app's configuration (e.g., reading from appsettings.json).
        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._config["JWT:SigninKey"]));     // This line creates a symmetric security key using a signing key from the configuration (JWT:SigningKey). The signing key is converted from a string to a byte array using UTF-8 encoding, which is necessary to create the key for signing the JWT.   
        }


        public string CreateToken(User user, String role)
        {
            var claims = new List<Claim>{               // This defines a list of claims, which represent pieces of information about the user that will be included in the token. Claims are key-value pairs embedded in the token and are accessible after the token is decoded. These claims allow the system to know the user's identity (e.g., email, username).
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName,user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(ClaimTypes.Role,role)
            };

            //  This defines the algorithm and key that will be used to sign the JWT. Specifies that the HMAC-SHA512 algorithm will be used for signing the token. This ensures that the token is securely signed and tamper-proof.
            var creds = new SigningCredentials(this._key, SecurityAlgorithms.HmacSha512);

            // This object defines the structure,content and expiration of the JWT that will be created.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),       //  The subject of the token is the ClaimsIdentity, which is built using the claims list (email, username).
                Expires = DateTime.Now.AddDays(7),          // Specifies the expiration time for the token (7 days from creation in this case).
                SigningCredentials = creds,                 // The signing credentials (algorithm and key) to be used for signing the token.
                Issuer = _config["JWT:Issure"],             // Defines the token's issuer, i.e., who issued the token (taken from appsettings.json under JWT:Issuer).
                Audience = _config["JWT:Audience"]          // Defines the token's audience, i.e., who the token is intended for (taken from appsettings.json under JWT:Audience).
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // converts the token into string from its byte format
            return tokenHandler.WriteToken(token);
        }
    }
}