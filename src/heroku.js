const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;
const compression = require('compression');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const routes = require('./routes/routes');
const errorsHandler = require('./middleware/errorsHandler');
const VAPID = require('./constants/VAPID');

webpush.setVapidDetails(
  'mailto:ant478@gmail.com',
  VAPID.PUBLIC,
  VAPID.PRIVATE,
);

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(sslRedirect());
app.use(compression());
app.use(bodyParser.json());
app.use('/api', routes.router);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
