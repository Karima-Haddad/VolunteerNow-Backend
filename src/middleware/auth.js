exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated?.()) {
    return res.status(401).json({ message: "Tu dois être connecté" });
  }
  next();
};


exports.ensureAuth = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Tu dois être connecté" });
  }
  next();
};