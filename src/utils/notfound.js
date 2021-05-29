const { GeneralError } = require('./errors');

class NotFound extends GeneralError {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
        if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }
}
  
module.exports = { NotFound };
