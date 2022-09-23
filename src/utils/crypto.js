const crypto = require('crypto');

module.exports.sha256Base64 = function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('base64');
}

module.exports.sha256Buffer = function sha256(input) {
  const hash = crypto.createHash('sha256').update(input).digest('base64');

  return Buffer.from(hash, 'base64');
}
