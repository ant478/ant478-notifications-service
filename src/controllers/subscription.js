const Response = require('../utils/Response');
const { Subscription } = require('../models');
const { sha256Buffer } = require('../utils/crypto');

module.exports.checkIfSubscribed = async function checkIfSubscribed(req, res) {
  const data = req.query;

  if (!data || !data.endpoint) {
    res.status(400).json(new Response());
    return;
  }

  const existingSubscription = await Subscription.findOne({ where: { endpointHash: sha256Buffer(data.endpoint) } });

  if (!existingSubscription) {
    res.status(404).json(new Response());
    return;
  }

  res.status(200).json(new Response());
}

module.exports.saveSubscription = async function saveSubscription(req, res) {
  const data = req.body;

  if (!data || !data.endpoint || !data.receiver || (!data.p256dh !== !data.auth)) {
    res.status(400).json(new Response());
    return;
  }

  try {
    const newSubscription = await Subscription.create({
      endpoint: data.endpoint,
      receiver: data.receiver,
      p256dh: data.p256dh,
      auth: data.auth,
    });
    const subscriptionInstance = await Subscription.findByPk(newSubscription.id);

    res.status(201).json(new Response({ data: subscriptionInstance }));
  } catch (error) {
    if (error.original.code === 'ER_DUP_ENTRY') {
      const existingSubscription = await Subscription.findOne({ where: { endpointHash: sha256Buffer(data.endpoint) } });

      existingSubscription.set({
        p256dh: data.p256dh,
        auth: data.auth,
      });

      await existingSubscription.save();

      res.status(200).json(new Response({ data: existingSubscription }));
      return;
    }

    throw error;
  }
};

module.exports.removeSubscription = async function removeSubscription(req, res) {
  const data = req.body;

  if (!data || !data.endpoint) {
    res.status(400).json(new Response());
    return;
  }

  const existingSubscription = await Subscription.findOne({ where: { endpointHash: sha256Buffer(data.endpoint) } });

  if (!existingSubscription) {
    res.status(404).json(new Response());
    return;
  }

  await existingSubscription.destroy();

  res.status(200).json(new Response());
}
