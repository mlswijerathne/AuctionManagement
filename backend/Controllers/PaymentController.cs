using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace DreamBid.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public PaymentController(IConfiguration configuration)
    {
        _configuration = configuration;
        StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
    }

    [HttpPost("create-checkout-session")]
    public async Task<ActionResult<CreateCheckoutSessionResponse>> CreateCheckoutSession([FromBody] CheckoutRequest request)
    {
        try
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmount = (long)(request.Amount * 100), // Convert to cents
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"Bid Payment for {request.AuctionTitle}",
                                Description = $"Auction ID: {request.AuctionId}, Bid ID: {request.BidId}"
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = $"{Request.Scheme}://{Request.Host}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{Request.Scheme}://{Request.Host}/checkout/cancel",
                Metadata = new Dictionary<string, string>
                {
                    { "BidId", request.BidId },
                    { "AuctionId", request.AuctionId }
                }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return Ok(new CreateCheckoutSessionResponse { SessionId = session.Id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}

    public class CheckoutRequest
    {
        public string BidId { get; set; }
        public string AuctionId { get; set; }
        public string AuctionTitle { get; set; }
        public decimal Amount { get; set; }
    }

    public class CreateCheckoutSessionResponse
    {
        public string SessionId { get; set; }
    }
}