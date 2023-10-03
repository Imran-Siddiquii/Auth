import express, { json } from 'express';
import initializeDatabase from './db/index.js';
const app = express();
import cors from 'cors';
import { addUserController } from './controllers/user.controller.js';
import { authVerify } from './middleware/index.js';
import { loginController, signUpController } from './Auth/index.js';
app.use(json());

initializeDatabase();

// global middleware error handle
// app.use((err, req, res, next) => {
//   res.status(400).json({ error: 'error' });
// });
// app.use(cors({ origin: 'http://localhost:3000' }));
// cors error sovle
// for multiple keep origin cors

// use halmet at the top to make protect you app

// global middleware router

app.get('/', (req, res) => {
  res.send('sever is running');
});

app.post('/user',authVerify,addUserController)
app.post('/signup',signUpController)
app.post('/login',loginController)

// if router is not found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(3000, () => {
  console.log('server started');
});
