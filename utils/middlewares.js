exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

exports.errorHandling = (error, req, res, next) => {
  const { statusCode, message, data } = error;
  res.status(statusCode).json({ message, data });
};
