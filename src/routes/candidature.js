const express = require("express");
const router = express.Router();


// On importe les deux fonctions du controller
const { participer, updateStatus } = require("../controllers/candidatureController");

// GARDE DU CORPS : sécurité temporairement désactivée pour tester facilement
const { ensureAuth } = require("../middleware/auth");

// Quand tout marchera, tu remettras la vraie sécurité :
// const ensureAuth = (req, res, next) => {
//   if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Tu dois être connecté" });
//   if (req.user.role !== "organisation") return res.status(403).json({ message: "Seules les organisations peuvent faire ça" });
//   next();
// };

// ROUTES
router.post("/evenements/:id/participer", participer);
router.patch("/candidatures/:candidatureId/status", ensureAuth, updateStatus);

module.exports = router;
