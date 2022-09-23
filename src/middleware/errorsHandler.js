const Response = require('../utils/Response');

// eslint-disable-next-line no-unused-vars
module.exports = function errorsHandler(error, req, res, next) {
  return res.status(500).json(new Response({
    message: error.message,
    stack: error.stack,
  }));
};
