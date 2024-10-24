const ValidationMiddleware = (schema) => (req, res, next) => {
  const value = schema.validate(req.body, { abortEarly: false });
  if (value.error) {
    return res.status(400).json({
      message: "Error",
      error: value?.error?.details.map((item) => {
        return { message: item.message, path: item.path[0] };
      }),
    });
  }
  next();
};

module.exports = ValidationMiddleware;
