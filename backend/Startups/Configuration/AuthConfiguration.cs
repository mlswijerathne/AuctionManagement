using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace DreamBid.Service.Configuration
{
    public static class AuthConfiguration
    {
        // Add Extension to tthe IServiceCollection
        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure the JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters   // This section sets the rules for validating JWT tokens.
                {
                    ValidateIssuer = true,                                          // Ensures the token has been issued by a trusted issuer. "true" is (Recommended for production; checks the iss claim in the token)
                    ValidateAudience = true,                                        // Ensures that the token is intended for the correct audience (i.e., the resource that the token is intended for). "true" is (Recommended in most cases; checks the aud claim in the token)
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,                                // Ensures the token's signature is valid by checking it against the key used to sign the token.
                    ValidIssuer = configuration["JWT:Issure"],              // The issuer value that you expect. This should match the iss claim in the token. can put Any valid string representing the trusted issuer, 
                    ValidAudience = configuration["JWT:Audience"],          // The expected audience for your tokens. This should match the aud claim in the token.Any string that represents your API or application.
                    IssuerSigningKey = new SymmetricSecurityKey(                    // The key used to validate the token's signature. This key is usually stored securely 
                        System.Text.Encoding.UTF8.GetBytes(configuration["JWT:SigninKey"])
                    )
                };
            });
        }
    }
}