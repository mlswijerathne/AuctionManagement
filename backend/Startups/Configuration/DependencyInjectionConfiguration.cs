using DreamBid.Data;
using DreamBid.Interfaces;
using DreamBid.Models;
using DreamBid.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace DreamBid.Startups.Configuration
{
    public static class DependencyInjectionConfiguration
    {
        // Add Extension to tthe IServiceCollection
        public static void ConfigureDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ITokenService, TokenService>();


            // register file manager service
            services.AddSingleton<IFileManagerService>(provider => new FileManagerService(configuration["DreamBidBaseDirectory"]));

            // This line registers the authentication services with the ASP.NET Core Dependency Injection (DI) system. It specifies the configuration for the authentication schemes used in the application.
            services.AddIdentity<User, IdentityRole>(options =>
            {
                // configure the identity service.
                // configure the password strength
                options.Password.RequireDigit = true;                               // This setting enforces that passwords must contain at least one digit (0-9).
                options.Password.RequireLowercase = true;                           // This ensures that passwords must include at least one lowercase letter (a-z).
                options.Password.RequireUppercase = true;                           // This setting enforces the inclusion of at least one uppercase letter (A-Z) in passwords.
                options.Password.RequireNonAlphanumeric = false;                    // This configuration specifies whether passwords must contain at least one non-alphanumeric character (e.g., special characters like !, @, #). Setting this to false means that while passwords 
                options.Password.RequiredLength = 6;                                // This sets the minimum length for passwords.
                                                                                    // configure the login configurations
                                                                                    // options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);   // the login in timeout to log out
                options.Lockout.MaxFailedAccessAttempts = 5;                        // maximum failed attepmts
                                                                                    // set the user requirements
                options.User.RequireUniqueEmail = true;                             // set the 
            }).AddEntityFrameworkStores<ApplicationDbContext>();                    // This method specifies that Identity should use ApplicationDbContext for storing user data. 

        }
    }
}