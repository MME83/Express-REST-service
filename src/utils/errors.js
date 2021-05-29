class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
      if (this instanceof GeneralError) {
          return 500;
      }
      return 500;
    }
}
  
module.exports = { GeneralError };
