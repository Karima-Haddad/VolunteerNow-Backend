const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({

    niveau: {
        type: String,
        enum: ["bronze", "Argent", "Or", "Platine"],
    },
    
    description: {
        type: String,
        default: ""
    },
    
    icon: {
        type: String,
        default: ""
    }
}, { timestamps: true }); 
module.exports = mongoose.model("Badge", badgeSchema);
