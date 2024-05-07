import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4040; // You can set this to any port number you prefer

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/transaction', (req, res) => {
  // Your code to handle the creation of a new entry goes here
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
