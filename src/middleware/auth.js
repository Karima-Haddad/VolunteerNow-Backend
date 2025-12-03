exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated?.()) {
    return res.status(401).json({ message: "Tu dois être connecté" });
  }
  next();
};


const jwt = require("jsonwebtoken");

exports.ensureAuth = (req, res, next) => {
  try {
    // Récupérer l'entête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // Extraire le token : "Bearer xxxxx"
    const token = authHeader.split(" ")[1];

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attacher les infos du user dans req.user
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
