const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
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
        let role;
        // Find the user by email
        if (isDoctor === false) {
            user = await User.findOne({ email });
            role = 'User';
        }
        else {
            user = await Doctor.findOne({ email });
            role = 'Doctor';
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
            { _id: user._id, role: role },
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


const UpdateDoctorProfile = async (req, res) => {
    try {
        const { regNo, address, fees, hospital, specialist, experience, location, assign, status } = req.body;

        // Find and update the doctor's profile based on the registration number
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { regNo },
            { address, fees, hospital, specialist, experience, location, assign, status },
            { new: true, runValidators: true } // Options: return the updated document and run validation
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor profile updated successfully',
            doctor: updatedDoctor,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor profile', error });
    }
};


const fetchData = async (req, res) => {

    try {
        // Get token from the Authorization header
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = req.header('Authorization')?.split(' ')[1];
        //  console.log(token);
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Access token is missing or invalid",
            });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("hhh", decoded);

        // Check if the user is a doctor or not based on their role
        const userModel = decoded.role === 'Doctor' ? Doctor : User;

        // Find user or doctor by their ID
        const userData = await userModel.findById(decoded._id).select('-hash_password'); // Exclude sensitive fields

        if (!userData) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        // Respond with user or doctor data
        res.status(StatusCodes.OK).json({
            success: true,
            userData,
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while fetching data",
            error: error.message,
        });
    }
};

const adminsignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist..!",
            });
        }

        if (user.password !== password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }

        // If password matches, generate the JWT token
        const token = jwt.sign(
            { _id: user._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        const { _id, email: userEmail } = user;

        // Send the token and user info back to the client
        return res.status(StatusCodes.OK).json({
            token,
            user: { _id, email: userEmail },
        });

    } catch (error) {
        console.error("Sign-in error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred during sign-in",
            error: error.message,
        });
    }
};

const AdminfetchData = async (req, res) => {

    try {
        // Get token from the Authorization header
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = req.header('Authorization')?.split(' ')[1];
        //  console.log(token);
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Access token is missing or invalid",
            });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("hhh", decoded);

        // Check if the user is a doctor or not based on their role
        const adminModel = Admin;

        // Find user or doctor by their ID
        const adminData = await adminModel.findById(decoded._id).select('-password'); // Exclude sensitive fields

        if (!adminData) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        // Respond with user or doctor data
        res.status(StatusCodes.OK).json({
            success: true,
            adminData,
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while fetching data",
            error: error.message,
        });
    }
};

const doctorListAssigned = async (req, res) => {
    try {
        // Query to find all doctors with assign value as "assign"
        const assignedDoctors = await Doctor.find({ assign: 'true' });
        res.status(200).json({ success: true, doctors: assignedDoctors });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const fetchupdateddoctors = async (req, res) => {
    try {
        // Query to find all doctors with assign value as "assign"
        const acceptedDoctors = await Doctor.find({ assign: 'false' });
        res.status(200).json({ success: true, doctors: acceptedDoctors });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updatedoctorstatus = async (req, res) => {
    try {
        const { regno, assign, status } = req.body; // Extract data from request body

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { regNo: regno }, // Match doctor by regno
            { assign, status }, // Update these fields
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({
            message: "Doctor accepted successfully",
            doctor: updatedDoctor
        });
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateavailability = async (req, res) => {
    try {
        const { regno, slots } = req.body;

        // Find doctor by regno and update the available field
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { regNo: regno }, // Match the regno
            { $set: { available: slots } }, // Update the available field
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({ success: true, doctor: updatedDoctor });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const fetchavailableslots = async (req, res) => {
    try {
        const { regno } = req.body;

        // Find doctor by regno
        const doctor = await Doctor.findOne({ regNo: regno });

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Return the available array
        res.status(200).json({
            success: true,
            available: doctor.available, // Include the available array
        });
    } catch (error) {
        console.error("Error fetching available slots:", error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const confirmslot = async (req, res) => {
    const { regNo, name, slot } = req.body;

    try {
        const doctor = await Doctor.findOne({ regNo });
        const user = await User.findOne({ name });


        if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });


        const slotIndex = doctor.available.indexOf(slot);
        if (slotIndex === -1) {
            return res.status(400).json({ success: false, message: "Slot not available" });
        }

        // Remove the slot from the available slots
        doctor.available.splice(slotIndex, 1);

        doctor.appointments.push({ patientName: name, slot });
        user.appointments.push({ regNo, slot });

        await doctor.save();
        await user.save();

        res.status(200).json({ success: true, message: "Slot confirmed successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getnames = async (req, res) => {
    const regNos = req.body.regNos;
    try {
        // Fetch names based on regNo from the database
        console.log(regNos); // Logs regNos to check what is being received
        const doctors = await Doctor.find({ regNo: { $in: regNos } }, 'regNo name');
        
        // Send the response back to the client
        res.status(200).json(doctors);  // Use res.json to send the data as JSON
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const linkgiven = async (req, res) => {
    const { regNo, videoLink, patientName } = req.body;

    // Check if the required fields are provided
    if (!videoLink || !patientName || !regNo) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Find the patient by name
        const user = await User.findOne({ name: patientName });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Check if the regNo and link are not null/undefined
        if (typeof regNo !== 'number' || typeof videoLink !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid data type for regNo or videoLink' });
        }

        // Update the `link` field by appending the new video link and regNo
        user.link.push({ link: videoLink, regNo: regNo });

        // Save the updated user
        await user.save();

        // Send a success response
        return res.status(200).json({ success: true, message: 'Video link updated successfully' });
    } catch (error) {
        console.error('Error updating video link:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


const uploadpres = async (req, res) => {
    const { medicines, regNo, patientName } = req.body;

    // Check if required fields are present
    if (!medicines || !patientName || !regNo) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Search for the patient in the User Schema
        const user = await User.findOne({ name: patientName });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Iterate over the medicines array and add regNo to each medicine entry
        const medicinesWithRegNo = medicines.map(medicine => ({
            ...medicine,
            regNo: regNo  // Add regNo to each medicine object
        }));

        // Push the medicines array (with regNo included) to the user.medicines field
        user.medicines.push(...medicinesWithRegNo);

        // Save the updated user
        await user.save();

        return res.status(200).json({ 
            success: true, 
            message: 'Prescription uploaded successfully', 
            user 
        });
    } catch (error) {
        console.error('Error uploading prescription:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const confirmstatus = async (req, res) => {
    const { regNo, patientName } = req.body;

    // Check if the required fields are provided
    try {   
        // Find the patient by name
        const user = await User.findOne({ name: patientName });
        const doctor = await Doctor.findOne( { regNo: regNo });

        // Check if the user exists
        if (!user || !doctor) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }


        // Update the `link` field by appending the new video link and regNo
        user.confirm.push({ confirm: true, regNo: regNo });
        doctor.confirm.push({ confirm: true, name: patientName });

        // Save the updated user
        await user.save();
        await doctor.save();

        // Send a success response
        return res.status(200).json({ success: true, message: 'confirm status  updated successfully' });
    } catch (error) {
        console.error('Error updating confirm status:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const UpdatePatientProfile = async (req, res) => {
    try {
        const { name, address, mobile, weight, dob, height, sex, bloodgroup } = req.body;

        // Find and update the doctor's profile based on the registration number
        const updatedPatient = await User.findOneAndUpdate(
            { name },
            { address, mobile, weight, dob, height, sex, bloodgroup },
            { new: true, runValidators: true } // Options: return the updated document and run validation
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Patient profile updated successfully',
            user: updatedPatient,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient profile', error });
    }
};

const fetchDoctors = async (req, res) => {
    const { name, location } = req.body;

    try {
        // Query to find a doctor with the given name and location
        console.log(name, location);
        const doctorExists = await Doctor.findOne({ name, address: location });

        if (doctorExists) {
            res.status(200).json({ success: true, message: 'Doctor found', doctor: doctorExists });
        } else {
            res.status(404).json({ success: false, message: 'No doctor found with the given name and location' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = {
    signUp, signIn, fetchData, UpdateDoctorProfile, adminsignIn, AdminfetchData, doctorListAssigned, updatedoctorstatus
    , fetchupdateddoctors, updateavailability, fetchavailableslots, confirmslot, getnames, linkgiven, uploadpres, confirmstatus, UpdatePatientProfile, fetchDoctors
};