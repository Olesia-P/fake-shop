/* eslint-disable no-console */
require('dotenv').config();

const mongoose = require('mongoose');

const connectToDatabase = () => {
  const URI = process.env.MONGO_PROD_URI;

  return mongoose
    .connect(URI)
    .then(() => {
      console.log('Database connected!');
      // return db;
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err.message);
      throw err;
    });
};

export default connectToDatabase;
