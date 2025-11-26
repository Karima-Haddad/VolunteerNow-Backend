const express = require("express");
const router = express.Router();


const { updateProfile } = require("../controllers/profilController");
const upload = require("../middleware/upload");

router.put("/update/:id", upload.single("photo"), updateProfile);

module.exports = router;
