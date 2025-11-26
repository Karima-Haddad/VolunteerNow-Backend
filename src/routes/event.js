const express = require('express');
const router = express.Router();

const { getEventById,getEventsPositions } = require('../controllers/eventController');

router.get("/localisations",getEventsPositions);
router.get("/:id",getEventById);

module.exports = router;