// seed.js

const mongoose = require("mongoose");
require("dotenv").config();

// Import des modèles
const User = require("./models/user");
const Evenement = require("./models/evenement");
const Candidature = require("./models/candidature");
const Badge = require("./models/badge");

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
