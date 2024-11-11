
const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./config/config"); //connecting to the database
const authRouter = require("./routes/auth");

const cors = require("cors");

const allowedOrigins = ['http://localhost:3000', 'https://medvision-1.onrender.com'];
// const corsOptions = {
//     origin: 'https://medvision-1.onrender.com', // Frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Include cookies in requests if needed
//   };

// Middleware to parse JSON bodiescls
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors(corsOptions));
app.use("/api", authRouter);


const start = async () => {
  try {
    const dbconnectstatus = await connectDB(process.env.MONGO_URL);
    if (dbconnectstatus) {
      console.log("Database Connected");
    }
    else {
      console.log("Error connecting to database");
    }
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

app.use('/', (req, res) => {
  res.send('Hello World!');
});
start();