using DreamBid.Service.Configuration;
using DreamBid.Startups.Configuration;

namespace DreamBid.Startups
{
    public static class StartupExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureHttp();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.ConfigureJsonOptions();
            services.ConfigureDatabase(configuration);
            services.ConfigureDependencies(configuration);
            services.ConfigureAuthentication(configuration);
            services.ConfigureSwagger();
        }
    }
}