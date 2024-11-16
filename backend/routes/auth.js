const express = require("express");
const router = express.Router();
const { signUp, signIn, fetchData, UpdateDoctorProfile, adminsignIn } = require("../controllers/auth");

// Define routes for authentication
router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/profile", UpdateDoctorProfile);
router.post("/admin", adminsignIn);
router.get("/fetchdata", fetchData);

module.exports = router;
