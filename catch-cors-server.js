const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

// Enable CORS for all routes
app.use(cors());

// Example endpoint to receive Base64-encoded localStorage data
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

// Start server on all interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://0.0.0.0:${port}`);
});
