const User = require("../models/user");
const bcrypt = require("bcrypt");

// 📌 Créer un compte utilisateur
exports.register = async (req, res) => {
    try {
        console.log("Données reçues :", req.body);

        const { email, password, name, role, ville, phone, bio, photo, categories, organisation_infos } = req.body;

        // Vérifier que les champs essentiels sont présents
        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "Champs requis manquants" });
        }

        // Vérifier si l'email existe déjà
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer le nouvel utilisateur
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            role,
            ville,
            phone,
            bio,
            photo,
            categories,
            organisation_infos: role === "organisation" ? organisation_infos || {} : null
        });

        // Sauvegarder dans la DB
        await newUser.save();

        // Réponse
        return res.status(201).json({
            message: "Compte créé avec succès",
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                name: newUser.name,
                organisation_infos: newUser.organisation_infos
            }
        });

    } catch (err) {
        console.error("Erreur lors de l'inscription :", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};


//cont