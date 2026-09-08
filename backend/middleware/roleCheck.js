const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access. Please log in." });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden. Insufficient permissions." });
    }

    next();
  };
};

module.exports = roleCheck;
