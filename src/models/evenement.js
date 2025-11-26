const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({

    // 🔗 Organisation qui a créé l'événement
    organisation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // 📝 Titre de l'événement
    titre: {
        type: String,
        required: true,
        trim: true
    },

    // 🧾 Description
    description: {
        type: String,
        default: ""
    },

    // 📅 Date et heure de l'événement
    date_event: {
        type: Date,
        required: true
    },

    // 🏠 Adresse textuelle (ville + rue + pays, etc.)
    localisation: {
        type: String,
        required: true,
        trim: true
    },

    // 📍 Position GPS exacte
    position: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },

    // 🏷️ Catégorie (environnement, social, santé…)
    categorie: {
        type: String,
        required: true,
        trim: true
    },

    // 👥 Nombre de places disponibles
    nb_places: {
        type: Number,
        required: true,
        min: 0
    },

    // 🔛 Statut
    statut: {
        type: String,
        enum: ["ouvert", "ferme", "termine"],
        default: "ouvert"
    }

}, { timestamps: true });


// Index utile pour filtrer par organisation
evenementSchema.index({ organisation_id: 1 });

module.exports = mongoose.model("Evenement", evenementSchema);
