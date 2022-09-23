const express = require('express');
const asyncHandler = require('express-async-handler');
const subscriptionController = require('../controllers/subscription');
const notificationController = require('../controllers/notification');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// Subscription
router.route('/subscription')
  .get(asyncHandler(subscriptionController.checkIfSubscribed))
  .post(asyncHandler(subscriptionController.saveSubscription))
  .delete(asyncHandler(subscriptionController.removeSubscription));

// Notification
router.route('/notification')
  .post(isAuthenticated, asyncHandler(notificationController.sendNotification));

module.exports.router = router;
