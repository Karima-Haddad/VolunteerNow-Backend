const mongoose = require("mongoose");
require("dotenv").config();
require("./config/connection");

const { Types } = mongoose;

// Import des modèles
const User = require("./models/user");
const Evenement = require("./models/evenement");
const Candidature = require("./models/candidature");
const Badge = require("./models/badge");
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
