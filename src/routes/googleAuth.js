const express = require("express");
const router = express.Router();
const passport = require("../config/googleStrategy");

// 1. Route pour démarrer l'authentification Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// 2. Callback après la connexion Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4200/login",
    session: false
  }),
  (req, res) => {
    const token = req.user.token;

    // Redirection vers Angular AVEC le token dans l'URL
    res.redirect(`http://localhost:4200/login-success?token=${token}`);
  }
);

// 3. Route en cas d'erreur Google
router.get("/failed", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

module.exports = router;
