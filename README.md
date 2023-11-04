# ant478 Push Notifications

My web service for storing Web Push subscriptions and sending notifications.

No public UI available, api is served from https://ant478-push-notifications-dd605c846b24.herokuapp.com/api.

## Endpoints

### GET /subscription
Checks if passed endpoint present in subscriptions list.
#### Query:
```
{
  endpoint: string,
}
```

### POST /subscription
Saves given subscription for later notifications sending
#### Body (JSON):
```
{
  endpoint: string,
  receiver: string, // used to filter subscriptions on notification sending
  p256dh?: string, // to be passed when payload is required in notification
  auth?: string, // to be passed when payload is required in notification
}
```

### DELETE /subscription
Removes given endpoint from subscriptions list
#### Body (JSON):
```
{
  endpoint: string,
}
```

### POST /notification
Sends Web Push notification to all endpoints with passed receiver, deletes stale notifications from list.
#### Headers
```
{
  x-api-key: string, // authorization key
}
```
#### Body (JSON):
```
{
  receiver: string,
}
```
