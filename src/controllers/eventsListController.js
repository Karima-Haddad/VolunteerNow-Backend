const Evenement = require("../models/evenement");


exports.getAllEventsList = async (req, res) => {
    try {
        const events = await Evenement.find().sort({ date_event: 1 }); 
        res.json(events);
    } catch (error) {
        console.error("Erreur getAllEventsList:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
