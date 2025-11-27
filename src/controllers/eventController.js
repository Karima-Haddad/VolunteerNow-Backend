const Evenement = require('../models/evenement');
const User = require('../models/user');
const Candidature = require("../models/candidature");
const assignBadges = require("../services/badgeService");

exports.getEventById = async (req,res) => {
    try{
        const id = req.params.id;

        const event = await Evenement.findById(id)
        .populate("organisation_id", "name email phone ville organisation_infos")
        .exec();

        if (!event) {
            return res.status(404).json({ message: "Événement introuvable" });
        }

        res.json(event);

    }
    catch(err){
        res.status(500).json({message: "Erreur serveur"})
    }
}


exports.getEventsPositions = async (req,res) =>{
    try{
        const events = await Evenement.find({ statut: "Ouvert" },{
            titre: 1,
            localisation: 1,
            position: 1
        });
        
        res.json(events);
    }
     catch (err) {
        console.error("Erreur getEventsPositions:", err);
        res.status(500).json({ message: "Erreur serveur" });
  }
}



exports.updateStatus = async(req,res) => {
    try{
        const { candidatureId } = req.params;
        const { statut } = req.body;

        //Mettre a jour la candidature
        const candidature = await Candidature.findByIdAndUpdate(
            candidatureId,
            {statut},
            {new:true}
        )

        if (!candidature) {
            return res.status(404).json({ message: "Candidature introuvable" });
        }

        //Récupérer toutes les candidatures acceptées de cet utilisateur
        if (statut === "Acceptée"){
            participations = await Candidature.find({
                user_id:candidature.user_id,
                statut: "acceptee"
            }).populate("event_id");
        }


        await assignBadges(candidature.user_id,participations);

        res.json({ 
            message: "Statut mis à jour",
            candidature 
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }

}