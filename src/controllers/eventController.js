// eventController 
const Evenement = require('../models/evenement');
const User = require('../models/user');

exports.getEventById = async (req,res) => {
    try{
        const id = req.params.id;

        const event = await Evenement.findById(id)
        .populate("organisation_id", "name email phone ville photo organisation_infos")
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



//*********************************MAYSSA**********************************/
exports.createEvent = async (req, res) => {
    console.log("REQ.USER =", req.user);  // <--- AJOUTE ÇA
    try {
        if (req.user.role !== "organisation") {
            return res.status(403).json({ message: "Seuls les organismes peuvent créer un événement" });
        }

        const event = new Evenement({
            ...req.body,
            organisation_id: req.user._id
        });

        await event.save();
        res.status(201).json(event);

    } catch (err) {
        console.error("Erreur createEvent:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

// Récupérer tous les événements
exports.getEvents = async (req, res) => {
    try {
        const events = await Evenement.find()
            .populate("organisation_id", "name organisation_infos");
        res.status(200).json(events);
    } catch (err) {
        console.error("Erreur getEvents:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};