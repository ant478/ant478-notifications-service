const fs = require('fs');

module.exports = {
  KEY: fs.readFileSync('sslcert/key.pem', 'utf8'),
  CERT: fs.readFileSync('sslcert/cert.pem', 'utf8'),
}
