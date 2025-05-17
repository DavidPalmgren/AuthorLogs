const express = require('express');
const novelRoutes = require('./routes/novelRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/test-db', (req, res) => {
  pool.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed', details: err });
    } else {
      res.json({ result: results[0].solution });
    }
  });
});

app.use('/api/novels', novelRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
