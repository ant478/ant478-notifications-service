const webPush = require('web-push');
const { Subscription } = require('../models');
const Response = require('../utils/Response');

async function sendWebPushNotification({ id, endpoint, p256dh, auth }, payload) {
  try {
    return payload && p256dh && auth
      ? await webPush.sendNotification({ endpoint, keys: { p256dh, auth } }, payload)
      : await webPush.sendNotification({ endpoint });
  } catch (error) {
    if ([404, 410].includes(error.statusCode)) {
      await Subscription.destroy({ where: { id } });
    }

    return null;
  }
}

module.exports.sendNotification = async function sendNotification(req, res) {
  const data = req.body;

  if (!data || !data.receiver) {
    res.status(400).json(new Response());
    return;
  }

  const subscriptions = await Subscription.findAll({ where: { receiver: data.receiver } });
  const payload = (data.payload ? JSON.stringify(data.payload) : '');

  const sendingNotifications = subscriptions.map((subscription) => sendWebPushNotification(subscription, payload));
  const results = await Promise.all(sendingNotifications);
  const count = results.filter(Boolean).length;

  res.status(200).json(new Response({ data: { count } }));
}
