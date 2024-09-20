import Cart from "../models/cart-model.js"

// Get User Cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Product to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            cart = new Cart({ user: req.userId, items: [] });
        }

        const existingProductIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingProductIndex >= 0) {
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.totalQuantity += quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove Product from Cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ user: req.userId });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


