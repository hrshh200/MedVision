const express = require("express");
const router = express.Router();
const { signUp, signIn, fetchData } = require("../controllers/auth");

// Define routes for authentication
router.post("/login", signIn);
router.post("/signup", signUp);
router.get("/fetchdata", fetchData);

module.exports = router;
