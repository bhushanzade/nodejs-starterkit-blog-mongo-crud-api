const jwt = require('jsonwebtoken');
const constant = require('../../config/constant');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  try {
    const decodedToken = jwt.verify(token, constant.PASSWORD);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: 'Invalid Token Found!' // Token not found
    });
  }
  next();
};