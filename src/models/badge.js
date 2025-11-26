const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true,
        trim: true
    },

    icon: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    niveau: {
        type: String,
        enum: ["bronze", "silver", "gold", "special"],
        default: "bronze"
    }

}, { timestamps: true }); 
module.exports = mongoose.model("Badge", badgeSchema);
