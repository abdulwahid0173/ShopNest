const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }
        else{
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });

            const message = `
            Dear ${req.user.name},
            Your order has been placed successfully. Order ID: ${order._id}\nTotal Amount: ${totalAmount}\nShipping Address: ${address.Fullname}, ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}
            \n\nThank you for shopping with us!
            `;

            await order.save();
            await sendEmail(req.user.email, 'Order Confirmation',message);
            res.status(201).json({ message: 'Order created successfully', order });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name')   
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated successfully', order });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };