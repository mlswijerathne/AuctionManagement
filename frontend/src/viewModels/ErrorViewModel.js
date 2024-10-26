class ErrorMessage {
    constructor(error) {
        this.error = error;
    }

    static errorMessageFromJoiError(error) {
        if (!error) return null;

        console.log("Validation error:", error); // Add this for debugging

        if (error.isJoi) {
            // Handle Joi validation errors
            const errorMessages = error.details.map(detail => detail.message).join(', ');
            return new ErrorMessage(errorMessages);
        }
        

        // Handle non-Joi errors
        return new ErrorMessage(error.message || 'An unexpected error occurred');
        }

        static errorMessageFromString(errorString) {
            return new ErrorMessage(errorString);
        }

    static errorMessageFromString(message) {
        return {
            error: message,
            details: null
        };
    }
        
    
}

export default ErrorMessage;