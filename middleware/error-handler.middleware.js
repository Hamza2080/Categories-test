const errorHandler = async (error, req, res, next) => {
  next(`Server Error - ${error.message}`);
};

module.exports.errorHandler = errorHandler;