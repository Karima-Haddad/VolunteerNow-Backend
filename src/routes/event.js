const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const { createEvent, getEventById, getEventsPositions, getEvents } =
    require('../controllers/eventController');

=======
const { getEventById, getEventsPositions, updateStatus } = require('../controllers/eventController');

router.get("/localisations",getEventsPositions);
router.get("/:id",getEventById);
router.put("/updateStatus/:candidatureId",updateStatus);
>>>>>>> f27c98e821e248b8d9f68187420a331d2592a256

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