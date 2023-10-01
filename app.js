import express, { json } from 'express';
import initializeDatabase from './db/index.js';
const app = express();
import cors from 'cors';
app.use(json());

initializeDatabase();

// global middleware error handle
app.use((err, req, res, next) => {
  res.status(400).json({ error: 'error' });
});
app.get('/', (req, res) => {
  res.send('sever is running');
});

// cors error sovle
// for multiple keep origin cors

app.use(cors({ origin: 'http://localhost:3000' }));
// use halmet at the top to make protect you app

// global middleware router
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(3000, () => {
  console.log('server started');
});
