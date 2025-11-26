const express = require('express');
const router = express.Router();
 
const { getEventById, getEventsPositions, updateStatus } = require('../controllers/eventController');

router.get("/localisations",getEventsPositions);
router.get("/:id",getEventById);


// Route création d'événement
router.post("/create", (req, res, next) => {
    console.log("REQ.USER =", req.user);
    next();
}, createEvent);


module.exports = router;


