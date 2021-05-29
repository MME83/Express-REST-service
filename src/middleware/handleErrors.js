const { GeneralError } = require('../utils/errors');
const { NotFound } = require('../utils/notfound');
const { BadRequest } = require('../utils/badrequest');

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  } if (err instanceof NotFound) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }
  if (err instanceof BadRequest) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }
  next();
  return res.status(500).json({
    status: 'error',
    message: err.message
  });

};

module.exports = handleErrors;
