// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// import exampleRoutes from './routes/exampleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api', exampleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
