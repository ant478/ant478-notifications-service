const express = require('express');
const https = require('https');
const compression = require('compression');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const routes = require('./routes/routes');
const errorsHandler = require('./middleware/errorsHandler');
const VAPID = require('./constants/VAPID');
const SSL = require('./constants/SSL');

webpush.setVapidDetails(
  'mailto:ant478@gmail.com',
  VAPID.PUBLIC,
  VAPID.PRIVATE,
);

const app = express();
const port = 14780;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(compression());
app.use(bodyParser.json());
app.use('/api', routes.router);
app.use(errorsHandler);

const options = {
  key: SSL.KEY,
  cert: SSL.CERT,
};
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
