const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const serveIndex = require('serve-index');
const path = require('path');

const app = express();
const port = 443;

// SSL certs
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ninja.lbvd.nl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ninja.lbvd.nl/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Enable CORS
app.use(cors());

// Serve files + directory listing from current working directory
const cwd = process.cwd();
app.use('/', express.static(cwd));
app.use('/', serveIndex(cwd, { icons: true }));

// API route
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
  console.log(`Server running at https://0.0.0.0:${port}`);
});
