const express = require("express");
const router = express.Router();
const { signUp, signIn, fetchData, AdminfetchData, UpdateDoctorProfile, adminsignIn, doctorListAssigned, updatedoctorstatus,fetchupdateddoctors, updateavailability, fetchavailableslots, confirmslot, getnames, linkgiven, uploadpres, confirmstatus, UpdatePatientProfile, fetchDoctors } = require("../controllers/auth");

// Define routes for authentication
router.post("/login", signIn);
router.post("/signup", signUp);
router.post("/profile", UpdateDoctorProfile);
router.post("/patientprofile", UpdatePatientProfile);
router.post("/updateslots", updateavailability);
router.post("/admin", adminsignIn);
router.get("/fetchdata", fetchData);
router.post("/fetchslots", fetchavailableslots);
router.get("/doctors", doctorListAssigned)
router.get("/alldoctors", fetchupdateddoctors);
router.get("/adminfetchdata", AdminfetchData);
router.put("/acceptdoctor", updatedoctorstatus);
router.post("/confirmslots", confirmslot);
router.post("/getnames", getnames);
router.post("/linkgiven", linkgiven);
router.post("/confirmstatus", confirmstatus);
router.post("/uploadpres", uploadpres);
router.post("/fetchdoctors", fetchDoctors);

module.exports = router;
