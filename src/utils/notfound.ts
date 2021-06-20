// import GeneralError from './errors';

/**
 * Class NotFound representing error message
 * @extends GeneralError
 */
class NotFound extends Error {
   /**
   * create error message
   * @param {string} message error message
   */
    // readonly code: number;

    constructor(message: string) {
      super(message);
      this.message = message;
     // this.code = responseCode;
    }
    
    /**
     * Get the error code status
     * @returns {number} error code status 404 or 500
     */
    getCode(): number {
        if (this instanceof NotFound) {
            return 404;
        }
        return 500; 
    } 
}
  
export default NotFound;
