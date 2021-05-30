const { GeneralError } = require('./errors');

/**
 * Class BadRequest representing error message
 * @extends GeneralError
 */
class BadRequest extends GeneralError {
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
     * @returns {number} error code status 400 or 500
     */
    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        return 500;
    }
}

module.exports = { BadRequest };