import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    orderStatus: { type: String, enum: ['pending', 'completed', 'shipped', 'delivered'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    createdAt: { type: Date, default: Date.now }
});

let Order = mongoose.model('Order', orderSchema);
export  default Order;
