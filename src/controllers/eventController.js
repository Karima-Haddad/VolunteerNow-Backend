const Evenement = require('../models/evenement');
const User = require('../models/user');

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
        const events = await Evenement.find({},{
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