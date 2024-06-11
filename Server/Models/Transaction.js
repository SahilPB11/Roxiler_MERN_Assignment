import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean
});

export default mongoose.model('Transaction', transactionSchema);
