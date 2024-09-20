import Payment from "../models/payment-schema.js";

// Process Payment
export const processPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;
        const newPayment = new Payment({
            order: orderId,
            paymentMethod,
            amount
        });
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Payment by Order ID
export const getPaymentByOrderId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ order: req.params.id });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
