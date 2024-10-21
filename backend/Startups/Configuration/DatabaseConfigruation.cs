using DreamBid.Data;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace DreamBid.Startups.Configuration
{
    public static class DatabaseConfiguration
    {
        // Add Extension to tthe IServiceCollection
        public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
{
    /* Configure all the database connectivity */
    // read environment variables
    // var dbServer = Environment.GetEnvironmentVariable("AuctionServer") ?? "localhost";
    // var dbUserName = Environment.GetEnvironmentVariable("AuctionUserName") ?? "sql";
    // var dbPassword = Environment.GetEnvironmentVariable("AuctionPassword") ?? "mysql";
    // var dbName = Environment.GetEnvironmentVariable("AuctionDatabase") ?? "Auction";

    var connectionString = configuration.GetConnectionString("DefaultConnection");

    /* Configure all the dependency injections */

    // configure the application db context dependency injection
    services
    .AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString)
    );
}
    }
}