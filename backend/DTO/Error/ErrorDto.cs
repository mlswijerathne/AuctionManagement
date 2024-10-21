using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DreamBid.Dtos.Error
{
    public class ErrorMessage
    {
        public string Error { get; set; }

        private ErrorMessage(string message)
        {
            this.Error = message;
        }
        public static ErrorMessage ErrorMessageFromModelState(ModelStateDictionary modelState)
        {
            if (modelState.ErrorCount < 0) throw new Exception("Internal Server Error");

            var error = modelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).FirstOrDefault();

            ErrorMessage errorMessage = new ErrorMessage(error);

            return errorMessage;
        }

        public static ErrorMessage ErrorMessageFromString(string error)
        {
            return new ErrorMessage(error);
        }

        public static ErrorMessage ErrorMessageFromIdentityResult(IdentityResult identityResult)
        {
            var error = identityResult.Errors.Select(e => e.Description).FirstOrDefault();
            return new ErrorMessage(error);
        }
    }
}