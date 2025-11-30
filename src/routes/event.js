const express = require('express');
const router = express.Router();

const { createEvent, getEventById, getEventsPositions, getEvents } =
    require('../controllers/eventController');


// Route création d'événement
router.post("/create", (req, res, next) => {
    console.log("REQ.USER =", req.user);
    next();
}, createEvent);

router.get("/", getEvents);   
router.get("/localisations", getEventsPositions);
router.get("/:id", getEventById);


module.exports = router;



// Route test  --------------------------------------
router.post("/test", (req, res) => {
    console.log("🔥 ROUTE /evenements/test OK !");
    res.json({ message: "Route test OK" });
});