/**
 * Class representing error message
 * @extends Error
 */
class GeneralError extends Error {
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
     * Get the error code status 500
     * @returns {number} error code status
     */
    getCode() {
      if (this instanceof GeneralError) {
          return 500;
      }
      return 500;
    }
}
  
module.exports = { GeneralError };
