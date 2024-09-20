import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

let Payment= mongoose.model('Payment', paymentSchema);
export default Payment
