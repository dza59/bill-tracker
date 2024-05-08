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

app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(mongodbUrl);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post('/api/transaction', async (req, res) => {
  console.log('POST /api/transaction');

  await mongoose.connect(mongodbUrl);
  const { price, name, description, datetime } = req.body;

  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
  });
  res.json(transaction);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
