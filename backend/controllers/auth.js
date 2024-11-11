const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const shortid = require("shortid");


const signUp = async (req, res) => {
    const { regNo, name, email, password, confirmPassword } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    try {
        // Hash the password
        const hash_password = await bcrypt.hash(password, 10);

        // Check if user already exists
        if (regNo === "") {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User already registered",
                });
            }

            // Create new user data
            const userData = {
                name,
                email,
                hash_password,
            };

            // Save the new user
            const newUser = await User.create(userData);
            res.status(StatusCodes.CREATED).json({ message: "User created successfully" });
        }

        else {
            const existingUser = await Doctor.findOne({ email });
            if (existingUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User already registered",
                });
            }

            // Create new user data
            const doctorData = {
                regNo,
                name,
                email,
                hash_password,
            };

            // Save the new user
            const newUser = await Doctor.create(doctorData);
            res.status(StatusCodes.CREATED).json({ message: "Doctor added successfully" });
        }

    } catch (error) {
        // Catch any other errors
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


const signIn = async (req, res) => {
    try {
        const { isDoctor, email, password } = req.body;
        console.log(req.body);

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        let user;
        // Find the user by email
        if(isDoctor === false){
            user = await User.findOne({ email });
        }
        else{
            user = await Doctor.findOne({ email });
        }

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist..!",
            });
        }

        // Ensure user.hash_password exists
        if (!user.hash_password) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "User password is missing from the database.",
            });
        }

        // Log to debug if required
        console.log('Plain Password:', password);
        console.log('Hashed Password from DB:', user.hash_password);

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.hash_password);

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }

        // If password matches, generate the JWT token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        const { _id, name, email: userEmail } = user;

        // Send the token and user info back to the client
        return res.status(StatusCodes.OK).json({
            token,
            user: { _id, name, email: userEmail },
        });

    } catch (error) {
        console.error("Sign-in error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred during sign-in",
            error: error.message,
        });
    }
};

module.exports = { signUp, signIn };