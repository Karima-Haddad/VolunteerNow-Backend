const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// === 1. Sous-document pour Organisation ===
const organisationInfosSchema = new mongoose.Schema({
    contact: { type: String, default: "" },
    description: { type: String, default: "" }
}, { _id: false });


// === 2. Schéma principal User ===
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['benevole', 'organisation'],
        required: true
    },

    name: {
        type: String,
        required: true
    },

    ville: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    photo: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },
    categories: {
        type: String,
        default: "" 
    },

    // === Infos spécifiques pour "organisation" ===
    organisation_infos: {
        type: organisationInfosSchema,
        default: null    // ne sera pas présent pour un bénévole
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date

}, { timestamps: true });  // createdAt + updatedAt


// === 3. HASH du mot de passe avant save() ===
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


// === 4. Export du modèle ===
module.exports = mongoose.model("User", userSchema);