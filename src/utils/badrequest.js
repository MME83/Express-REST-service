const { GeneralError } = require('./errors');

class BadRequest extends GeneralError {
    constructor(message) {
        super();
        this.message = message;
    }
    
    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        return 500;
    }
}

module.exports = { BadRequest };