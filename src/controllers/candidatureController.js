const Candidature = require("../models/candidature");
const Evenement = require("../models/evenement");
const User = require("../models/user");
const Notification = require("../models/notification");
const assignBadges = require("../services/badgeService")

// ==================== BÉNÉVOLE CLIQUE "PARTICIPER" ====================
exports.participer = async (req, res) => {
  try {
    const benevoleId = req.user._id;
    const evenementId = req.params.id;

    const evenement = await Evenement.findById(evenementId);
    if (!evenement) return res.status(404).json({ message: "Événement non trouvé" });
    if (evenement.statut !== "ouvert") {
      return res.status(400).json({ message: "Les inscriptions sont fermées" });
    }

    const deja = await Candidature.findOne({ user_id: benevoleId, event_id: evenementId });
    if (deja) return res.status(400).json({ message: "Tu as déjà postulé" });

    const candidature = await Candidature.create({
      user_id: benevoleId,
      event_id: evenementId,
    });

    const benevole = await User.findById(benevoleId);

    // Notification à l'organisation
    await Notification.create({
      destinataire_id: evenement.organisation_id,
      type: "nouvelle_candidature",
      titre: "Nouvelle candidature",
      message: `${benevole.name} souhaite participer à "${evenement.titre}"`,
      lien: `/evenement/${evenementId}/candidatures`,
      lu: false,
      donnees: {
        benevole_id: benevoleId,
        benevole_nom: benevole.name,
        evenement_id: evenementId,
        evenement_titre: evenement.titre,
      }
    });

    res.status(201).json({
      message: "Candidature envoyée avec succès !",
      candidature
    });

  } catch (error) {
    console.error("Erreur participer:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Tu as déjà postulé" });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ==================== ORGA ACCEPTE OU REFUSE UNE CANDIDATURE ====================
exports.updateStatus = async (req, res) => {
  try {
    const { candidatureId } = req.params;
    const { statut } = req.body; // "acceptee" ou "refusee"

    if (!["acceptee", "refusee"].includes(statut)) {
      return res.status(400).json({ message: "Statut invalide. Utilise 'acceptee' ou 'refusee'" });
    }

    // Récupérer la candidature avec les infos nécessaires
    const candidature = await Candidature.findById(candidatureId)
      .populate("user_id", "name email")
      .populate("event_id", "titre organisation_id");

    if (!candidature) {
      return res.status(404).json({ message: "Candidature introuvable" });
    }

    // Sécurité : seule l'organisation propriétaire de l'événement peut modifier
    if (candidature.event_id.organisation_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Accès refusé : tu n'es pas l'organisateur" });
    }

    // Mise à jour du statut
    candidature.statut = statut;
    await candidature.save();

    // Notification au bénévole
    const messageNotif =
      statut === "acceptee"
        ? `Félicitations ! Ta candidature pour "${candidature.event_id.titre}" a été acceptée !`
        : `Ta candidature pour "${candidature.event_id.titre}" a été refusée. Merci pour ton intérêt !`;

    await Notification.create({
      destinataire_id: candidature.user_id._id,
      type: "candidature_traitee",
      titre: statut === "acceptee" ? "Accepté" : "Refusé",
      message: messageNotif,
      lien: `/evenement/${candidature.event_id._id}`,
      lu: false,
      donnees: {
        benevole_id: candidature.user_id._id,
        benevole_nom: candidature.user_id.name,
        evenement_id: candidature.event_id._id,
        evenement_titre: candidature.event_id.titre,
        statut: candidature.statut,
      }
    });

        // === Si accepté → déclencher les badges ===
    if (statut === "acceptee") {
      const participations = await Candidature.find({
        user_id: candidature.user_id._id,
        statut: "acceptee"
      }).populate("event_id");

      if (typeof assignBadges === "function") {
        await assignBadges(candidature.user_id._id, participations);
      }
    }

    // Réponse de succès
    res.json({
      message: "Statut mis à jour avec succès",
      candidature,
      notification_envoyee_au_benevole: true
    });

  } catch (error) {
    console.error("Erreur updateStatus:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};




















//============================KARIMA====================================

exports.getCandidatureStatus = async (req, res) => {
    try {
        const userId = req.user._id  || req.user.id;       // récupéré depuis le token
        const eventId = req.params.eventId;

        const candidature = await Candidature.findOne({
            user_id: userId,
            event_id: eventId
        });

        if (!candidature) {
            return res.json({ status: "none" });
        }

        let status = candidature.statut;
        return res.json({ status });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
