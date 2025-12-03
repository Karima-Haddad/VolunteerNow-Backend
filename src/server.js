require('dotenv').config();

// Connection to DB
require('./config/connection');

// CORS import 
const cors = require("cors");


// Express
const express = require('express');
const app = express();

// Session + Passport
const session = require("express-session");
const passport = require("./config/googleStrategy");

app.use(express.json());

app.use(session({
  secret: "volunteernow",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// Accepter types JSON
app.use(express.json()); 

//Cors configuration
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use('/uploads', express.static('uploads'));



// ====================== ROUTES OFFICIELLES ======================
const loginRouter       = require('./routes/login');
const profileRouter     = require('./routes/profil');
const googleAuthRouter  = require('./routes/googleAuth');
const eventRouter       = require('./routes/event');
const candidatureRouter = require('./routes/candidature');
const statsRoute = require('./routes/statsRoutes');

app.use('/auth',       loginRouter);
app.use('/profil',     profileRouter);
app.use('/authgoogle', googleAuthRouter);
app.use('/evenements', eventRouter);
app.use('/candidature',candidatureRouter);
app.use('/stats',statsRoute);


// // ====================== ROUTES DE TEST (à supprimer en prod) ======================
// const User = require("./models/user");

// // 1. Créer l’orga de test → VERSION COMPLÈTE AVEC organisation_infos (PLUS JAMAIS NULL !)
// // VERSION QUI MARCHE À 100% → ON FORCE LA RÉCRÉATION COMPLÈTE
// // VERSION FINALE → marche à 100%, organisation_infos complet, plus d'erreur password
// app.post("/temp/create-orga", async (req, res) => {
//   try {
//     // 1. On supprime l'ancienne (pour être sûr)
//     await User.deleteOne({ email: "test.orga@volunteernow.com" });

//     // 2. On crée avec un mot de passe bidon (obligatoire dans le modèle)
//     const orga = await User.create({
//       name: "Association Test Algérie",
//       email: "test.orga@volunteernow.com",
//       password: "orga123456",  // ← MOT DE PASSE BIDON (obligatoire)
//       role: "organisation",
//       googleId: "fake-google-12345",
//       ville: "Alger",
//       phone: "+213 123 456 789",
//       bio: "Association pour l'environnement et le bénévolat en Algérie",
//       photo: "https://via.placeholder.com/150",
//       organisation_infos: {
//         nom: "Association Test Algérie",
//         description: "Nous organisons des actions de nettoyage, reforestation et aide sociale à travers tout le pays.",
//         site_web: "https://test-algerie.dz",
//         logo: "https://via.placeholder.com/150",
//         annee_creation: 2018,
//         nombre_membres: 450,
//         domaines: ["Environnement", "Éducation", "Santé", "Aide sociale"]
//       }
//     });

//     res.json({ 
//       message: "Organisation créée avec succès → organisation_infos complet !", 
//       organisation: orga 
//     });
//   } catch (err) {
//     console.error("Erreur création orga:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. Login orga de test
// app.get("/test-login-orga", async (req, res) => {
//   try {
//     const orga = await User.findOne({ email: "test.orga@volunteernow.com" });
//     if (!orga) return res.status(404).json({ message: "Crée d'abord l'orga avec /temp/create-orga" });

//     req.login(orga, (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Connecté comme organisation", user: orga });
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // 3. Créer bénévole de test
// app.post("/temp/create-benevole", async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { email: "benevole.test@gmail.com" },
//       {
//         email: "benevole.test@gmail.com",
//         password: "123456",
//         name: "Karim Benali",
//         role: "benevole",
//         ville: "Alger"
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
//     res.json({ message: "Bénévole de test prêt", user });
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// // 4. Login bénévole de test
// app.get("/fake-login-benevole", async (req, res) => {
//   try {
//     const benevole = await User.findOne({ role: "benevole" });
//     if (!benevole) {
//       return res.status(404).json({ message: "Aucun bénévole trouvé. Utilise /temp/create-benevole d'abord." });
//     }

//     req.login(benevole, (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({
//         message: "Connecté comme bénévole",
//         user: { _id: benevole._id, name: benevole.name, email: benevole.email }
//       });
//     });
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// // 5. Voir les 10 dernières notifications
// app.get("/test-notifs", async (req, res) => {
//   const Notification = require("./models/notification");
//   const notifs = await Notification.find({})
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .populate("destinataire_id", "name email")
//     .populate("donnees.benevole_id", "name photo");
//   res.json(notifs);
// });

// ====================== DEMARRAGE SERVEUR ======================
app.listen(3000, () => {
  console.log('Server work on http://localhost:3000');
});







const User = require("./models/user");

app.put("/test/add-user", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
            role
        });

        res.json({
            message: "Utilisateur ajouté avec succès",
            user: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
