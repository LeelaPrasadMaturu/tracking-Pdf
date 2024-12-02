const express = require('express');
const app = express();

app.get('/track', (req, res) => {
    console.log('PDF Opened:', new Date(), 'From IP:', req.ip);
    res.sendFile(__dirname + '/pixel.png'); // Serve the pixel
});

app.listen(3000, () => console.log('Tracking server running on port 3000'));
