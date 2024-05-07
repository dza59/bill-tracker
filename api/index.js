import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Transaction from './models/transaction.js';
import process from 'process';

const mongodbUrl = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4040;

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello World!' });
  console.log('MongoDB URL:', mongodbUrl);
});

app.post('/api/transaction', async (req, res) => {
  console.log('MongoDB URL:', mongodbUrl); // Confirm the URL is visible here as well
  const { name, description, datetime } = req.body;

  try {
    const transaction = new Transaction({ name, description, datetime });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('MongoDB URL:', mongodbUrl);
});
