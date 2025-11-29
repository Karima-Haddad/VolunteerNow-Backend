const express = require("express");
const router = express.Router();
const { getAllEventsList } = require("../controllers/eventsListController");

router.get("/all", getAllEventsList);

module.exports = router;
