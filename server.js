const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Log file path
const logFilePath = path.join('/tmp', 'tracking_logs.txt');


app.get('/track', (req, res) => {
   
    console.log(`Endpoint /track was accessed : PDF Opened:  ${new Date().toISOString()} , From IP: ${req.ip}\n`); // Debug log

     // Create log entry
    const logEntry = `PDF Opened:  ${new Date().toISOString()} , From IP: ${req.ip}\n`;

    // Append log entry to file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });

    // Serve the 1x1 pixel image
    res.sendFile(path.join(__dirname, 'pixel.png'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tracking server running on port ${PORT}`));
