using System.Net;
using DreamBid.Dtos.Error;

namespace DreamBid.Middlewares
{
    public class ErrorHandlingMiddlware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddlware> _logger;

        public ErrorHandlingMiddlware(RequestDelegate next, ILogger<ErrorHandlingMiddlware> logger)
        {
            this._next = next;
            this._logger = logger;
        }

        public async Task Invoke(Microsoft.AspNetCore.Http.HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occoured");

                var response = ErrorMessage.ErrorMessageFromString("An unexpected error occoured");
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}