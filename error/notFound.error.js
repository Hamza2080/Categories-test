const HttpError = require('./HttpError.error');

class NotFoundError extends HttpError {}

module.exports = NotFoundError;