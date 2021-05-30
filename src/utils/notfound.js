const { GeneralError } = require('./errors');

/**
 * Class NotFound representing error message
 * @extends GeneralError
 */
class NotFound extends GeneralError {
   /**
   * create error message
   * @param {string} message error message
   */
    constructor(message) {
      super();
      /** @private */
      this.message = message;
    }
    
    /**
     * Get the error code status
     * @returns {number} error code status 404 or 500
     */
    getCode() {
        if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }
}
  
module.exports = { NotFound };
