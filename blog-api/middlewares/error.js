module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (statusCode) {
    res.status(statusCode).json({ message: err.message });
  }
};

//NOT FOUND MIDDLEWARE

module.exports.errorNotFoundHandler = (req, res, next) => {
  error = new Error(`Not Found in ${req.orginalUrl}`);
  res.status(404);
  next(error);
};
