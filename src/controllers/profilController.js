const User = require('../models/user');
const bcrypt = require("bcrypt")

exports.updateProfile = async (req,res) => {
    try{

        //recuperer les données
        const userId = req.params.id;
        const { name, email, phone, ville, bio, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }


        //verifier que l'email n'existe pas déjà et le màj
        if (email && email !== user.email) {
            const emailUsed = await User.findOne({ email });
            if (emailUsed) {
                return res.status(400).json({ message: "Cet email est déjà utilisé" });
            }
        }

        // Vérifier que le mot de passe actuel est correct
        if (oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Ancien mot de passe incorrect" });
            }
        }
        //màj des données
        user.email = email;
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (ville) user.ville = ville;
        if (bio) user.bio = bio;
        if (newPassword) user.password = newPassword; 
        if (req.file) user.photo = `/uploads/users/${req.file.filename}`;


        // Sauvegarder
        await user.save();

        res.json({ message: "Profil modifié avec succès" });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
}







///yelzem tgued les badges   w amehi fonction taa profil tekhdem beha 
//*****************************MAYSSA***************************

// ========================================
// 1. TON PROFIL CONNECTÉ (avec événements + badges)
// ========================================

exports.getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    const Candidature = require("../models/candidature");

    // Récupère toutes ses participations acceptées
    const participations = await Candidature.find({
      user_id: user._id,
      statut: "acceptee",
    }).populate("event_id", "titre date lieu photo couverture");

    const badges = user.badges || [];

    res.json({
      profil: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ville: user.ville || "",
        phone: user.phone || "",
        photo: user.photo || "",
        bio: user.bio || "",
        organisation_infos: user.organisation_infos || null,
        createdAt: user.createdAt,

        // NOUVEAU : tout ce qui rend le profil impressionnant
        participations: participations.map((c) => ({
          _id: c.event_id._id,
          titre: c.event_id.titre,
          date: c.event_id.date,
          lieu: c.event_id.lieu,
          photo: c.event_id.photo || c.event_id.couverture,
        })),
        nombre_participations: participations.length,
        badges: badges,
        niveau:
          badges.length >= 10
            ? "Légende"
            : badges.length >= 5
            ? "Expert"
            : badges.length >= 2
            ? "Confirmé"
            : "Débutant",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// ========================================
// 2. TOUS LES UTILISATEURS (liste admin ou recherche)
// ========================================
exports.getAllUsers = async (req, res) => {
  try {
    const User = require("../models/user");
    const users = await User.find({})
      .select("-password -resetPasswordToken -resetPasswordExpires -__v")
      .sort({ createdAt: -1 });

    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



// ========================================
// 3. PROFIL PUBLIC D’UN UTILISATEUR PAR ID (le plus impressionnant)
// ========================================
exports.getPublicProfile = async (req, res) => {
  try {
    const User = require("../models/user");
    const Candidature = require("../models/candidature");

    const user = await User.findById(req.params.id)
      .select("-password -resetPasswordToken -resetPasswordExpires -__v");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupère ses événements acceptés
    const participations = await Candidature.find({
      user_id: user._id,
      statut: "acceptee",
    }).populate("event_id", "titre date lieu photo couverture");

    const badges = user.badges || [];

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ville: user.ville || "",
        phone: user.phone || "",
        photo: user.photo || "",
        bio: user.bio || "",

        participations: participations.map((c) => ({
          _id: c.event_id._id,
          titre: c.event_id.titre,
          date: c.event_id.date,
          lieu: c.event_id.lieu,
          photo: c.event_id.photo || c.event_id.couverture,
        })),
        nombre_participations: participations.length,
        badges: badges,
        niveau:
          badges.length >= 10
            ? "Légende"
            : badges.length >= 5
            ? "Expert"
            : badges.length >= 2
            ? "Confirmé"
            : "Débutant",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ID invalide ou erreur serveur" });
  }
};



//////////////////////////////////////////////////////////////////  
exports.getProfile=async (req, res) =>{
     try {
        // req.user doit contenir l'utilisateur connecté (déjà fourni par ton système auth existant)
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }

}
