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