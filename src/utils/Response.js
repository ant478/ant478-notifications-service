module.exports = class Response {
  constructor({ message, data, stack } = {}) {
    if (message) {
      this.message = message;
    }

    if (data) {
      this.data = data
    }

    if (process.env.NODE_ENV !== 'production') {
      this.stack = (stack || new Error().stack.split(/\n */));
    }
  }
}
