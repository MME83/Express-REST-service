const routerErrorHandler = (funcerror) => (req, res, next) =>
  funcerror(req, res, next).catch((err) => {
    next(err);
  });

module.exports = routerErrorHandler;

/*
const routerErrorHandler = (funcerror) => (req, res, next) =>
  funcerror(req, res).catch(next);

module.exports = routerErrorHandler;
*/
