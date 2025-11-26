const express = require("express");
const router = express.Router();

const { getProfile, updateProfile , getMyProfile, getAllUsers,getPublicProfile} = require("../controllers/profilController");
const upload = require("../middleware/upload");
const requireLogin = require("../middlewares/auth");



router.get("/me", requireLogin, getMyProfile);
router.get("/all", requireLogin, getAllUsers);
router.get("/:id", getPublicProfile);
router.put("/update/:id", requireLogin, upload.single("photo"), updateProfile);

module.exports = router;

