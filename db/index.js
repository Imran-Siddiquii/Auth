import { connect } from 'mongoose';

import { config } from 'dotenv';
config();
// Access your MongoDB connection string from secrets
// require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;
const initializeDatabase = async () => {
  try {
    const connection = await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log('Connected Successfully');
    }
  } catch (error) {
    console.log('Connection Failed', error);
  }
};

export default initializeDatabase;
