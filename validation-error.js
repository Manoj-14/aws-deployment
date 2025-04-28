const { CustomError } = require("./customError");

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }

}

if (1 > 0) {
    throw new ValidationError("1 is always grator then 0").getFormatedError();
}
module.exports = { ValidationError }