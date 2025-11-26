<<<<<<< HEAD
// seed.js

const mongoose = require("mongoose");
require("dotenv").config();
=======
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/connection");

const { Types } = mongoose;
>>>>>>> fb741b7 (premier Commit)

// Import des modèles
const User = require("./models/user");
const Evenement = require("./models/evenement");
const Candidature = require("./models/candidature");
const Badge = require("./models/badge");
<<<<<<< HEAD

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("📌 Connected to MongoDB"))
.catch(err => console.error("❌ Connection error:", err));

async function seed() {
    try {
        console.log("🧹 Suppression des anciennes données...");
        await User.deleteMany({});
        await Evenement.deleteMany({});
        await Candidature.deleteMany({});
        await Badge.deleteMany({});

        // -----------------------------------------------------
        // 1️⃣ INSÉRER LES BADGES
        // -----------------------------------------------------
        console.log("🏅 Insertion des badges...");

        await Badge.insertMany([
            { niveau: "bronze", description: "5 participations", icon: "🥉" },
            { niveau: "Argent", description: "15 participations", icon: "🥈" },
            { niveau: "Or", description: "20 participations + 3 villes", icon: "🥇" },
            { niveau: "Platine", description: "30 participations + 5 villes", icon: "💎" }
        ]);

        // -----------------------------------------------------
        // 2️⃣ UTILISATEURS : 2 bénévoles + 2 organisations
        // -----------------------------------------------------
        console.log("👤 Insertion des utilisateurs...");

        const users = await User.insertMany([
            {
                name: "Benevole 1",
                email: "benevole1@test.com",
                password: "123456",
                role: "benevole"
            },
            {
                name: "Benevole 2",
                email: "benevole2@test.com",
                password: "123456",
                role: "benevole"
            },
            {
                name: "Organisation A",
                email: "orga1@test.com",
                password: "123456",
                role: "organisation"
            },
            {
                name: "Organisation B",
                email: "orga2@test.com",
                password: "123456",
                role: "organisation"
            }
        ]);

        const benevole1 = users[0];
        const benevole2 = users[1];
        const org1 = users[2];
        const org2 = users[3];

        // -----------------------------------------------------
        // 3️⃣ 30 ÉVÉNEMENTS DANS 5 VILLES – POUR TESTER TOUS LES BADGES
        // -----------------------------------------------------
        console.log("📅 Insertion de 30 événements...");

        const villes = [
            "Tunis - La Goulette",
            "Sousse - Corniche",
            "Nabeul - Centre",
            "Ariana - Ennasr",
            "Ben Arous - Mourouj"
        ];

        let eventsData = [];

        for (let i = 0; i < 30; i++) {
            eventsData.push({
                organisation_id: i % 2 === 0 ? org1._id : org2._id,
                titre: `Événement ${i + 1}`,
                description: "Événement de test pour le système de badges",
                date_event: new Date(),
                localisation: villes[i % villes.length], // 5 villes différentes
                position: {
                    latitude: 36.8 + i * 0.01,
                    longitude: 10.1 + i * 0.01
                },
                categorie: "test",
                nb_places: 20,
                statut: "ouvert"
            });
        }

        const events = await Evenement.insertMany(eventsData);

        // -----------------------------------------------------
        // 4️⃣ CRÉATION DES CANDIDATURES ACCEPTÉES
        // -----------------------------------------------------
        console.log("📨 Insertion des candidatures...");

        let candidatures = [];

        // ➤ Benevole1 : EXACTEMENT 5 participations (badge BRONZE)
        for (let i = 0; i < 5; i++) {
            candidatures.push({
                user_id: benevole1._id,
                event_id: events[i]._id,
                statut: "acceptee"
            });
        }

        // ➤ Benevole2 : EXACTEMENT 15 participations (badge ARGENT)
        for (let i = 0; i < 15; i++) {
            candidatures.push({
                user_id: benevole2._id,
                event_id: events[i]._id,
                statut: "acceptee"
            });
        }

        await Candidature.insertMany(candidatures);

        console.log("✅ SEED terminé avec succès !");
    } catch (err) {
        console.error("❌ Erreur lors du seed :", err);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Déconnecté de MongoDB");
    }
}

seed();
=======
const UserBadge = require("./models/userBadges");

async function seedDatabase() {
  try {
    console.log("MongoDB connecté ✔");

    // 🧹 Suppression des anciennes données
    await User.deleteMany();
    await Evenement.deleteMany();
    await Candidature.deleteMany();
    await Badge.deleteMany();
    await UserBadge.deleteMany();

    console.log("🧹 Collections vidées.");

    // =====================================================
    // 🔵 1. UTILISATEURS
    // =====================================================

    // Bénévole
    const user = await User.create({
      _id: new Types.ObjectId("000000000000000000000001"),
      email: "karima@gmail.com",
      password: "123456",
      role: "benevole",
      name: "Karima Haddad",
      ville: "Tunis",
      phone: "22556677",
      bio: "Bénévole engagée"
    });

    // Organisation (avec sous-doc organisation_infos)
    const userOrg = await User.create({
      _id: new Types.ObjectId("000000000000000000000100"),
      email: "avenir@gmail.com",
      password: "avenir123",
      role: "organisation",
      name: "Association Avenir",
      ville: "Tunis",
      phone: "28659874",
      bio: "Construire un avenir durable",

      organisation_infos: {
        site_web: "https://association-avenir.tn",
        categories: "Environnement",
        description: "Association pour la protection de la nature"
      }
    });

    // =====================================================
    // 🟩 2. ÉVÉNEMENT (lié directement à User organisation)
    // =====================================================

    const event = await Evenement.create({
      _id: new Types.ObjectId("000000000000000000000200"),
      organisation_id: userOrg._id,
      titre: "Nettoyage de plage",
      description: "Action de nettoyage à La Marsa",
      date_event: new Date("2025-01-15"),
      localisation: "La Marsa",
      categorie: "Environnement",
      nb_places: 50,
      statut: "ouvert",
      photo: ""
    });

    // =====================================================
    // 🟧 3. CANDIDATURE
    // =====================================================

    await Candidature.create({
      user_id: user._id,
      event_id: event._id,
      statut: "en_attente",
      date_candidature: new Date("2025-01-01")
    });

    // =====================================================
    // 🟨 4. BADGE
    // =====================================================

    const badge = await Badge.create({
      _id: new Types.ObjectId("000000000000000000000300"),
      nom: "Super Bénévole",
      icon: "🏅",
      description: "Pour les bénévoles actifs",
      niveau: "gold"
    });

    // =====================================================
    // 🟦 5. USER BADGE
    // =====================================================

    await UserBadge.create({
      user_id: user._id,
      badge_id: badge._id,
      date_obtention: new Date("2025-01-10")
    });

    // =====================================================
    console.log("🎉 Base de données remplie avec succès !");
    process.exit();

  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    process.exit();
  }
}

seedDatabase();
>>>>>>> fb741b7 (premier Commit)
