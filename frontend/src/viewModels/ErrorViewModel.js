export default class ErrorMessage {
    error = "";

    constructor(errorMessage) {
        this.error = errorMessage || "An unknown error occurred";
    }

    static errorMessageFromJoiError(error) {
        // Handle null or undefined error
        if (!error) {
            return new ErrorMessage("An unknown validation error occurred");
        }

        // Handle missing details array
        if (!error.details || !Array.isArray(error.details)) {
            return new ErrorMessage(error.message || "Invalid validation error format");
        }

        try {
            // Map through details and create error message
            const errorMessage = error.details
                .map(detail => (detail.message || "").replace(/"/g, "'"))
                .filter(message => message) // Remove any empty messages
                .join(" , ")
                .toString();

            return new ErrorMessage(errorMessage || "Validation failed");
        } catch (e) {
            console.error("Error parsing validation error:", e);
            return new ErrorMessage("Failed to process validation error");
        }
    }

    static errorMessageFromString(error) {
        // Handle different error types
        if (!error) {
            return new ErrorMessage("An unknown error occurred");
        }

        if (typeof error === 'string') {
            return new ErrorMessage(error);
        }

        if (error instanceof Error) {
            return new ErrorMessage(error.message);
        }

        if (typeof error === 'object') {
            return new ErrorMessage(error.message || JSON.stringify(error));
        }

        return new ErrorMessage(String(error));
    }

    static errorMessageFromAny(error) {
        // Handle any type of error input
        if (!error) {
            return new ErrorMessage("An unknown error occurred");
        }

        // If it's already an ErrorMessage instance, return it
        if (error instanceof ErrorMessage) {
            return error;
        }

        // If it has details property, treat it as Joi error
        if (error.details && Array.isArray(error.details)) {
            return this.errorMessageFromJoiError(error);
        }

        // Otherwise treat it as a string error
        return this.errorMessageFromString(error);
    }

    toString() {
        return this.error;
    }
}