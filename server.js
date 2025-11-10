import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = '/api';

// Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Load products data
const productsFile = path.join(__dirname, 'data', 'products.json');
function loadProducts() {
  try {
    const raw = fs.readFileSync(productsFile, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to load products.json', e);
    return [];
  }
}

// Routes
app.get(`${API_PREFIX}/products`, (req, res) => {
  const products = loadProducts();
  res.json(products);
});

app.get(`${API_PREFIX}/products/:id`, (req, res) => {
  const products = loadProducts();
  const id = Number(req.params.id);
  const product = products.find(p => Number(p.id) === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Not found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}${API_PREFIX}`);
});


