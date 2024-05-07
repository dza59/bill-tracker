import { model, Schema } from 'mongoose';

const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const Transaction = model('Transaction', TransactionSchema);

export default Transaction;
