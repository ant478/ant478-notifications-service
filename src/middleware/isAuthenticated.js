const Response = require('../utils/Response');
const apiKey = require('../constants/apiKey');
const { sha256Base64 } = require('../utils/crypto');

function isValidApiKey(key = '') {
  return (sha256Base64(key) === apiKey);
}

module.exports = function isAuthenticated(req, res, next) {
  if (!isValidApiKey(req.get('x-api-key'))) {
    res.status(403).json(new Response());
    return;
  }

  return next();
};
