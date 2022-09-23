const webPush = require('web-push');
const { Subscription } = require('../models');
const Response = require('../utils/Response');

module.exports.sendNotification = async function sendNotification(req, res) {
  const data = req.body;

  if (!data || !data.receiver) {
    res.status(400).json(new Response());
    return;
  }

  const subscriptions = await Subscription.findAll({ where: { receiver: data.receiver } });
  const payload = (data.payload ? JSON.stringify(data.payload) : '');

  const sentNotificationIds = [];
  const outdatedNotificationIds = [];

  await Promise.all(subscriptions.map(async ({ id, endpoint, p256dh, auth }) => {
    try {
      if (payload && p256dh && auth)
        await webPush.sendNotification({ endpoint, keys: { p256dh, auth } }, payload)
      else
        await webPush.sendNotification({ endpoint });

      sentNotificationIds.push(id);
    } catch (error) {
      if ([404, 410].includes(error.statusCode)) {
        outdatedNotificationIds.push(id);
      }
    }
  }));

  if (outdatedNotificationIds.length > 0) {
    await Subscription.destroy({ where: { id: outdatedNotificationIds } });
  }

  res.status(200).json(new Response({ data: { count: sentNotificationIds.length } }));
}
