const { readJSON } = require('../utils/jsonStore');

// Simple header-based token or user check for fast demo/prototype setup
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If no header, allow request but user is anonymous or check body userId
    req.user = null;
    return next();
  }

  const userId = authHeader.replace('Bearer ', '').trim();
  const users = readJSON('users.json');
  const foundUser = users.find(u => u.id === userId || u.email === userId);

  if (foundUser) {
    req.user = foundUser;
  } else {
    req.user = null;
  }
  next();
};

module.exports = authMiddleware;
