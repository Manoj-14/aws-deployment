class CustomError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
    }

    getFormatedError() {
        const stackLines = this.stack.split("\n")
        const callerline = stackLines[1];
        const match = callerline.match(/at (.+):(\d+):(\d+)/);
        const formatedErrorString = `Error from file \x1b[31m ${match[0]} \x1b[0m at line \x1b[31m ${match[2]} \x1b[0m`;
        return formatedErrorString;
    }
}

module.exports = { CustomError }