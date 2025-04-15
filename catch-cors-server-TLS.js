const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 443; // HTTPS port

// Load SSL certificate and private key
const privateKey = fs.readFileSync('/etc/letsencrypt/live/<domain>/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/<domain>/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Enable CORS
app.use(cors());

// Your existing route
app.get('/api', (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ message: 'No data provided.' });
  }

  try {
    const decoded = Buffer.from(data, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    console.log('Decoded localStorage data:', parsed);

    res.json({ message: 'Data received and decoded successfully!' });
  } catch (err) {
    console.error('Error decoding or parsing data:', err);
    res.status(400).json({ message: 'Invalid Base64 or JSON format.' });
  }
});

// Create HTTPS server
https.createServer(credentials, app).listen(port, () => {
  console.log(` ^=^t^r HTTPS Server running at https://0.0.0.0:${port}`);
});