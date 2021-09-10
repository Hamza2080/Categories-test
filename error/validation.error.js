const HttpError = require('./HttpError.error');

class ValidationError extends HttpError {}

module.exports = ValidationError;