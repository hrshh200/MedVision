const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
// const {  
//   isRequestValidated,
//   validateSignUpRequest,
//   validateSignIpRequest,
// } = require("../validators/auth");
const app = express();

app.use(express.json());


router.route("/login").post(signIn);


router.route("/signup").post(signUp);


module.exports = router;