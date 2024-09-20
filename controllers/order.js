import Order  from '../models/order-model.js';

// Create New Order
export const createOrder = async (req, res) => {
    try {
        const { products, totalPrice, shippingAddress } = req.body;
        const newOrder = new Order({
            user: req.userId,  // assuming userId from JWT middleware
            products,
            totalPrice,
            shippingAddress
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Orders for a User
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
