using Newtonsoft.Json;

namespace DreamBid.Startups.Configuration
{
    public static class JsonConfiguration
    {
        // Add Extension to tthe IServiceCollection
        public static void ConfigureJsonOptions(this IServiceCollection services)
        {
            // Override the default System.Text.Json formatter
            services.AddControllers().AddNewtonsoftJson(options =>      // This method adds Newtonsoft.Json as the JSON serializer/deserializer instead of the default System.Text.Json. Newtonsoft.Json is a widely-used JSON library in .NET applications that provides more flexibility, especially for complex serialization scenarios, like handling circular references or custom data formatting.
                                                                        // customize how serialization and deserialization are handled.
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore         // This setting controls how reference loops in objects are handled during serialization.A reference loop occurs when two objects reference each other. Without proper handling, this could lead to an infinite loop while serializing, causing the program to crash. By setting ReferenceLoopHandling.Ignore, Newtonsoft.Json will ignore the reference loop and stop the recursive serialization, which prevents potential crashes and infinite loops.
            );

        }
    }
}