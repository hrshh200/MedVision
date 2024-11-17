const express = require("express");
const router = express.Router();
const { signUp, signIn, fetchData, AdminfetchData, UpdateDoctorProfile, adminsignIn } = require("../controllers/auth");

// Define routes for authentication
router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/profile", UpdateDoctorProfile);
router.post("/admin", adminsignIn);
router.get("/fetchdata", fetchData);
router.get("/adminfetchdata", AdminfetchData);

module.exports = router;
