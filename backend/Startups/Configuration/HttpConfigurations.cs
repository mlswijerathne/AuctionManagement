namespace DreamBid.Startups.Configuration
{
    public static class HttpConfiguration
    {
        public static void ConfigureHttp(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .WithExposedHeaders("x-auth-token");
                });
            });
        }
    }
}