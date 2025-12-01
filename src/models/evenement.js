const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({

    organisation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    titre: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    date_event: {
        type: Date,
        required: true
    },

    localisation: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /.+[-–—].+/.test(v);
            },
            message: props => `La valeur "${props.value}" doit contenir au moins un tiret (ex: Alger-Centre)`
        }
    },

<<<<<<< HEAD
    position: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },

=======
    // Catégorie (environnement, social, santé…)
>>>>>>> f27c98e821e248b8d9f68187420a331d2592a256
    categorie: {
        type: String,
        required: true,
        trim: true
    },

<<<<<<< HEAD
=======
    // Nombre de places disponibles
>>>>>>> f27c98e821e248b8d9f68187420a331d2592a256
    nb_places: {
        type: Number,
        required: true,
        min: 0
    },

<<<<<<< HEAD
=======
    // Statut
>>>>>>> f27c98e821e248b8d9f68187420a331d2592a256
    statut: {
        type: String,
        enum: ["Ouvert", "Fermé", "Terminé"],
        default: "ouvert"
    }

}, { timestamps: true });

evenementSchema.index({ organisation_id: 1 });

module.exports = mongoose.model("Evenement", evenementSchema);