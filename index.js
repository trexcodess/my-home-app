// index.js (Example)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

// 1. Static files first (CSS/JS/Images)
app.use(express.static(path.join(__dirname, 'dist')));

// 2. API Routes SECOND
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 3. React/Wildcard handler LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});