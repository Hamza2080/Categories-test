const HttpError = require('./HttpError.error');

class UnExpectedError extends HttpError {}

module.exports = UnExpectedError;