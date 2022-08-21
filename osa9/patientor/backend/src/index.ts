import express from 'express';

import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors());

const PORT = 3001;

// Routes
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
