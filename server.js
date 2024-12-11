const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require("dotenv").config();

// MongoDB Atlas Connection URI
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');
app.use(cors());


// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the Log Schema
const logSchema = new mongoose.Schema({
    message: String,
    timestamp: { type: Date, default: Date.now },
    ip: String,
});

// Create Log Model
const Log = mongoose.model('Log', logSchema);

// Endpoint to track events
app.get('/track', async (req, res) => {
    console.log(`Endpoint /track was accessed`);

    const logEntry = new Log({
        message: 'PDF Opened',
        ip: req.ip,
    });

    try {
        // Save log entry to MongoDB
        await logEntry.save();
        console.log('Log entry saved:', logEntry);
    } catch (err) {
        console.error('Error saving log entry:', err);
    }

    // Serve the 1x1 pixel image
    res.sendFile(path.join(__dirname, 'pixel.png'));
});

// Endpoint to fetch logs
app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }); // Get logs in descending order
        res.json(logs);
    } catch (err) {
        console.error('Error fetching logs:', err);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
