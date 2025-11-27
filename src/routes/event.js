const express = require('express');
const router = express.Router();

const { getEventById, getEventsPositions, updateStatus } = require('../controllers/eventController');

router.get("/localisations",getEventsPositions);
router.get("/:id",getEventById);
router.put("/updateStatus/:candidatureId",updateStatus);

module.exports = router;