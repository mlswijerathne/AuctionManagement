export default class ErrorMessage {

    error = "";

    constructor(errorMessage) {
        this.error = errorMessage;
    }

    static errorMessageFromJoiError(error){
        let errorMessage= error.details.map(detail => detail.message.replace(/"/g, "'")).join(" , ").toString();
        return new ErrorMessage(errorMessage);
    }

    static errorMessageFromString(error) {

        return new ErrorMessage(error);
    }

}
