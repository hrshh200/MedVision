
const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./config/config"); //connecting to the database
const authRouter = require("./routes/auth");

const cors = require("cors");

const corsOptions = {
    origin: 'https://medvision-1.onrender.com', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies in requests if needed
  };

// Middleware to parse JSON bodiescls
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", authRouter);

// const port = process.env.PORT || 5000;
const start = async () => {
    try {
        const dbconnectstatus = await connectDB(process.env.MONGO_URL);
        if (dbconnectstatus) {
            console.log("Database Connected");
        }
        else {
            console.log("Error connecting to database");
        }
        app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
          });
    } catch (error) {
        console.log("error =>", error);
    }
};
start();